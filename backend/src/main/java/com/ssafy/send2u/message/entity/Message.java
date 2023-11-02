package com.ssafy.send2u.message.entity;

import com.ssafy.send2u.user.entity.user.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
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

@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`top`", nullable = false)
    private Float top;

    @Column(name = "`left`", nullable = false)
    private Float left;

    @Column(name = "`rotate`", nullable = false)
    private Float rotate;

    @Column(name = "`z_index`", nullable = false)
    private Long zindex;

    @Column(nullable = false)
    private Long type;

    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private User receiver;

    private Long bgcolor;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String thumbnailFileUrl;
    private String sourceFileUrl;

}
