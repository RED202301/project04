package com.ssafy.send2u.message.dto;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class MessageDto {
    private Long id;
    private String content;
    private Long senderId;
    private Long receiverId;
}
