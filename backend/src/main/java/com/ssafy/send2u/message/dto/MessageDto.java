package com.ssafy.send2u.message.dto;

import lombok.*;

import java.sql.Time;
import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class MessageDto {
    private Long id;

    private String content;
    private Float top;
    private Float left;
    private Float rotate;
    private Long zIndex;

    private Long type;
    private Long bgcolor;
    private LocalDateTime createdAt;

    private Long senderId;
    private Long receiverId;

}
