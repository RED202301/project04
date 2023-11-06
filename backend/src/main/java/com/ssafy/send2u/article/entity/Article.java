package com.ssafy.send2u.article.entity;


import com.ssafy.send2u.user.entity.user.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter

@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;
    private String longText;
    @ApiModelProperty(hidden = true)
    private String senderId;
    private String articleTitle;
    private String articleFileUrl;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "articlesender_id")
    private User articleSender;
    @CreatedDate
    private LocalDateTime date;
    public Article() {
        // Default constructor
    }

    // Getters and setters
}
