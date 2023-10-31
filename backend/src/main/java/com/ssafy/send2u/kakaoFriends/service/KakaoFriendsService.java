package com.ssafy.send2u.kakaoFriends.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoFriendsService {
    private static final String FRIENDS_API_URL = "https://kapi.kakao.com/v1/api/talk/friends";

    public String getFriends(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        ResponseEntity<String> response = restTemplate.exchange(FRIENDS_API_URL, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
}
