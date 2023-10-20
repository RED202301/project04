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

    @Column(name = "`top`")
    private Float top;

    @Column(name = "`left`")
    private Float left;

    @Column(name = "`rotate`")
    private Float rotate;

    @Column(name = "`z_index`")
    private Long zindex;

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
    private String thumbnail;
    private String sourceSrc;
    private String EmojiSrc;

}
