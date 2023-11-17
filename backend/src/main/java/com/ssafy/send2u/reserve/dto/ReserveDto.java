package com.ssafy.send2u.reserve.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReserveDto {
    private Long id;
    private String content;
    private Long senderId;
    private Long receiverId;
    private Double top;
    private Double reserveleft;
    private Double rotate;
    private Integer zindex;
    private Integer type;
    private Integer bgcolor;



}
