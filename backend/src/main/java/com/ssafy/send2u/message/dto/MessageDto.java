package com.ssafy.send2u.message.dto;

import lombok.*;

public class MessageDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response {
        private Long id;
        private String content;
        private Long senderId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        private String content;
    }
}
