package com.ssafy.send2u.message.dto;

import com.ssafy.send2u.message.entity.Message;
import lombok.*;

import java.sql.Time;
import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class MessageDto {
    private Long id;

    private Float top;
    private Float left;
    private Float rotate;
    private Long zindex;

    private LocalDateTime createdAt;

    private Long type;
    private Long receiverId;
    private Long senderId;

    private Long bgcolor;
    private String content;

    public MessageDto(Message message) {
         this.id = message.getId();
         this.top = message.getTop();
         this.left = message.getLeft();
         this.rotate = message.getRotate();
         this.zindex = message.getZindex();
         this.createdAt = message.getCreatedAt();
         this.type = message.getType();
         this.receiverId = message.getReceiver().getUserSeq();
         this.senderId = message.getSender().getUserSeq();
         this.bgcolor = message.getBgcolor();
         this.content = message.getContent();
    }
}
