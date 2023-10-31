package com.ssafy.send2u.kakaoFriends.controller;

import com.ssafy.send2u.kakaoFriends.service.KakaoFriendsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/kakao")
public class KakaoFriendsController {

    private final KakaoFriendsService kakaoFriendsService;

    @GetMapping("/friendlist")
    public String getKakaoFriends(@RequestParam("access_token") String accessToken) {
        return kakaoFriendsService.getFriends(accessToken);
    }

}
