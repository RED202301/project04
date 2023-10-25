package com.ssafy.send2u.message.entity;

import com.ssafy.send2u.user.entity.user.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

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
    private String content;
    private String thumbnailFileUrl;
    private String sourceFileUrl;

}
