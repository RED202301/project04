package com.ssafy.send2u.article.controller;

//import com.ssafy.send2u.article.domain.UploadFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.send2u.article.dto.ArticleDto;
import com.ssafy.send2u.article.entity.Article;
import com.ssafy.send2u.article.service.ArticleService;
import com.ssafy.send2u.common.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequestMapping("/articles")
@CrossOrigin(origins = "*")
public class ArticleController {
    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<Article> getArticle(@PathVariable Long articleId) {
        Article article = articleService.getArticleById(articleId);
        if (article != null) {
            return new ResponseEntity<>(article, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addArticle(@RequestPart(value = "article", required = false) String articleDtoJson, @RequestPart(value = "articleFileUrl", required = false) MultipartFile articleFileUrl) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ArticleDto articleDto = null;

        if (articleDtoJson != null) {
            articleDto = objectMapper.readValue(articleDtoJson, ArticleDto.class);
        }

        // articleDto가 null이거나, articleDto의 articleSender가 null이거나 비어있는 경우 기본값 설정
        if (articleDto == null || articleDto.getArticleSender() == null || articleDto.getArticleSender().isEmpty()) {
            if (articleDto == null) {
                articleDto = new ArticleDto();
            }
            articleDto.setArticleSender("AAA");
        }

        ArticleDto createdArticleDto = articleService.addArticle(articleDto, articleFileUrl);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("받은 메세지 리스트")
                .status(OK.value())
                .data(createdArticleDto)
                .build();

        return ResponseEntity.ok(apiResponse);
    }


    @DeleteMapping("/{articleId}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long articleId) {
        articleService.deleteArticle(articleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PutMapping("/{articleId}")
//    public ResponseEntity<Article> updateArticle(@PathVariable Long articleId, @RequestBody Article article) {
//        Article updatedArticle = articleService.updateArticle(articleId, article);
//        if (updatedArticle != null) {
//            return new ResponseEntity<>(updatedArticle, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//}

}
