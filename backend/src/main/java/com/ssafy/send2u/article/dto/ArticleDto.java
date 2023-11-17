package com.ssafy.send2u.article.dto;

//import com.ssafy.send2u.article.domain.UploadFile;

import com.ssafy.send2u.article.entity.Article;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ArticleDto {
    private Long articleId;

    private String longText;

    private LocalDateTime date;

    private String articleTitle;

    private String articleWriter;

    public ArticleDto(Article article) {
        this.articleId = article.getArticleId();
        this.articleTitle = article.getArticleTitle();
        this.longText = article.getLongText();
        this.date = article.getDate();
        this.articleWriter = article.getArticleWriter().getUsername();
    }

    @Data
    public static class Request {
        private String longText;
        private String articleTitle;
    }

}