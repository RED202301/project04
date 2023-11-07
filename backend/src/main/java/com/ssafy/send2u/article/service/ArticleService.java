package com.ssafy.send2u.article.service;

import com.ssafy.send2u.article.dto.ArticleDto;
import com.ssafy.send2u.article.entity.Article;
import com.ssafy.send2u.article.repository.ArticleRepository;
import com.ssafy.send2u.aws.service.AwsService;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final UserRepository userRepository;
    private final AwsService awsService;
    private final ArticleRepository articleRepository;

    public List<ArticleDto> getAllArticles() {
        List<ArticleDto> list = articleRepository.findAll().stream().map(ArticleDto::new).collect(Collectors.toList());
        return list;
    }

    public ArticleDto getArticleById(Long articleId) {
        Article article = articleRepository.findById(articleId).orElse(null);
        if (article == null) {
            throw new IllegalArgumentException("해당하는 게시글이 없습니다.");
        }
        return new ArticleDto(article);
    }

    public List<ArticleDto> getMyArticles() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User writer = userRepository.findByUserId(principal.getUsername());
        if (writer == null) {
            throw new UsernameNotFoundException("User not found with username");
        }

        List<Article> articles = articleRepository.findByArticleWriter(writer);
        return articles.stream().map(ArticleDto::new).collect(Collectors.toList());
    }

    @Transactional
    public ArticleDto addArticle(ArticleDto.Request articleRequestDto) {

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User writer = userRepository.findByUserId(principal.getUsername());

        // 사용자가 존재하지 않을 경우를 대비한 null 체크 추가
        if (writer == null) {
            throw new UsernameNotFoundException("User not found with username");
        }

        Article article = new Article();

        article.setLongText(articleRequestDto.getLongText());
        article.setArticleTitle(articleRequestDto.getArticleTitle());
        article.setArticleWriter(writer);

        Article savedArticle = articleRepository.save(article);
        return new ArticleDto(savedArticle);
    }

    @Transactional
    public Long deleteArticle(Long articleId) {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User currentUser = userRepository.findByUserId(principal.getUsername());
        if (currentUser == null) {
            throw new UsernameNotFoundException("User not found with username");
        }

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid article ID: " + articleId));

        if (!article.getArticleWriter().equals(currentUser)) {
            throw new IllegalArgumentException("You are not authorized to delete this article");
        }

        articleRepository.delete(article);
        return articleId;
    }

    @Transactional
    public ArticleDto updateArticle(Long articleId, ArticleDto.Request updatedArticleDto) {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User currentUser = userRepository.findByUserId(principal.getUsername());
        if (currentUser == null) {
            throw new UsernameNotFoundException("User not found with username");
        }

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid article ID: " + articleId));

        if (!article.getArticleWriter().equals(currentUser)) {
            throw new IllegalArgumentException("You are not authorized to update this article");
        }

        article.setLongText(updatedArticleDto.getLongText());
        article.setArticleTitle(updatedArticleDto.getArticleTitle());

        Article updatedArticle = articleRepository.save(article);
        return new ArticleDto(updatedArticle);
    }
}


