package com.ssafy.send2u.message.dto;

import com.ssafy.send2u.message.entity.SecretMessage;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class SecretMessageDto {
    private Long id;

    private Float top;
    private Float left;
    private Float rotate;
    private Long zindex;
    private LocalDateTime createdAt;
    private Long type;

    @ApiModelProperty(hidden = true)
    private String senderId;

    private String receiverId;

    private Long bgcolor;
    private String content;

    @ApiModelProperty(hidden = true)
    private String thumbnailFileUrl;


    @ApiModelProperty(hidden = true)
    private String sourceFileUrl;

    @ApiModelProperty(hidden = true)
    private String senderName;

    @ApiModelProperty(hidden = true)
    private String receiverName;

    public SecretMessageDto(SecretMessage secretMessage) {
        this.id = secretMessage.getId();
        this.top = secretMessage.getTop();
        this.left = secretMessage.getLeft();
        this.rotate = secretMessage.getRotate();
        this.zindex = secretMessage.getZindex();
        this.createdAt = secretMessage.getCreatedAt();
        this.type = secretMessage.getType();
        this.receiverId = secretMessage.getReceiver().getUserId();
        this.senderId = secretMessage.getSender().getUserId();
        this.bgcolor = secretMessage.getBgcolor();
        this.content = secretMessage.getContent();
        this.thumbnailFileUrl = secretMessage.getThumbnailFileUrl();
        this.sourceFileUrl = secretMessage.getSourceFileUrl();
        this.senderName = secretMessage.getSender().getUsername();
        this.receiverName = secretMessage.getReceiver().getUsername();
    }
}
