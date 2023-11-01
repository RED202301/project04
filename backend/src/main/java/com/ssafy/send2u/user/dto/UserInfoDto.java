package com.ssafy.send2u.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserInfoDto {
    private String userName;
    private String userId;
    private String userProfileImageUrl;
}
