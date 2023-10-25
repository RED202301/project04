package com.ssafy.send2u.message.dto;

import com.ssafy.send2u.message.entity.Message;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.sql.Time;
import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class MessageDto {
    @ApiModelProperty(hidden = true)
    private Long id;

    private Float top;
    private Float left;
    private Float rotate;
    private Long zindex;

    @ApiModelProperty(hidden = true)
    private LocalDateTime createdAt;

    private Long type;

    @ApiModelProperty(hidden = true)
    private Long senderId;

    private Long receiverId;

    private Long bgcolor;
    private String content;

    @ApiModelProperty(hidden = true)
    private String thumbnailFileUrl;


    @ApiModelProperty(hidden = true)
    private String sourceFileUrl;

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
        this.thumbnailFileUrl = message.getThumbnailFileUrl();
        this.sourceFileUrl = message.getSourceFileUrl();
    }
}
