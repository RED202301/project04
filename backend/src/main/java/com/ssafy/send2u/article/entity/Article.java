package com.ssafy.send2u.article.entity;


import com.ssafy.send2u.user.entity.user.User;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;

    private String longText;

    private String articleTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "articlewriter_id")
    private User articleWriter;

    @CreatedDate
    private LocalDateTime date;

}
