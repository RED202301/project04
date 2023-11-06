package com.ssafy.send2u.article.dto;

//import com.ssafy.send2u.article.domain.UploadFile;
import com.ssafy.send2u.article.entity.Article;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data

public class ArticleDto {
    private Long articleId;
    private String longText;
    private LocalDateTime date;
    private String articleTitle;
    @ApiModelProperty(hidden = true)
    private String senderId;
    @ApiModelProperty(hidden = true)
    private String articleFileUrl;
    private String articleSender;
    public ArticleDto() {

    }

    public ArticleDto(Article article) {
        this.articleTitle = article.getArticleTitle();
        this.longText = article.getLongText();
        this.date = LocalDateTime.now();
        this.articleFileUrl = article.getArticleFileUrl();
        this.senderId = article.getArticleSender().getUserId();
        this.articleSender = article.getArticleSender().getUsername();
    }
}