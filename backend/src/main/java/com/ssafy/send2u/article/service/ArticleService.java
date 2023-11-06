package com.ssafy.send2u.article.service;

import com.ssafy.send2u.article.dto.ArticleDto;
import com.ssafy.send2u.article.entity.Article;
import com.ssafy.send2u.article.repository.ArticleRepository;
import com.ssafy.send2u.aws.service.AwsService;
import com.ssafy.send2u.common.error.ErrorCode;
import com.ssafy.send2u.common.error.exception.NoAuthorizationException;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
@Slf4j
@Service
public class ArticleService {
    private final UserRepository userRepository;
    private final AwsService awsService;
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(UserRepository userRepository, AwsService awsService, ArticleRepository articleRepository) {
        this.userRepository = userRepository;
        this.awsService = awsService;
        this.articleRepository = articleRepository;
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Article getArticleById(Long articleId) {
        return articleRepository.findById(articleId).orElse(null);
    }

    @Transactional
    public ArticleDto addArticle(ArticleDto articleDto, MultipartFile articleFileUrl) throws IOException {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        log.info(principal.toString());
//        User sender = userRepository.findById(senderId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid sender Id:" + senderId));


        User sender = userRepository.findByUserId(principal.getUsername());

        // 사용자가 존재하지 않을 경우를 대비한 null 체크 추가
        if (sender == null) {
            throw new UsernameNotFoundException("User not found with username: " + sender);
        }

        String articleFileURL = null;
        if (articleFileUrl != null && !articleFileUrl.isEmpty()) {
            try {
                articleFileURL = awsService.fileUpload(articleFileUrl, "article");
            } catch (Exception e) {
                throw new IOException("Error occurred while uploading file to AWS", e);
            }
        }
        Article article = new Article();
        article.setLongText(articleDto.getLongText());
        article.setArticleTitle(articleDto.getArticleTitle());
        article.setArticleSender(sender);
        article.setArticleFileUrl(articleFileURL);

        Article savedArticle;
        try {
            savedArticle = articleRepository.save(article);
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while saving the article", e);
        }

        return new ArticleDto(savedArticle);
    }
    @Transactional
    public Long deleteArticle(Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid message Id: " + articleId));

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User currentUser = userRepository.findByUserId(principal.getUsername());

        // username을 사용하여 User 객체를 찾습니다.

        if (!article.getArticleSender().equals(currentUser)) {
            throw new NoAuthorizationException(ErrorCode.NO_Authorization);
        }

        if (article.getArticleFileUrl() != null) {
            awsService.fileDelete(article.getArticleFileUrl());
        }

        articleRepository.deleteById(articleId);
        return articleId;
    }
//    @Transactional
//    public ArticleDto updateArticle(Long articleId, Article updatedArticle) {
//        Article article = articleRepository.findById(articleId).orElseThrow(() -> new IllegalArgumentException("Invalid message Id: " + articleId));
//        Article updatedMessage = articleRepository.save(article);
//
//        return new ArticleDto(updatedArticle);
//    }
//}

}
