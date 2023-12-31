package com.ssafy.send2u.user.service;

import com.ssafy.send2u.common.error.ErrorCode;
import com.ssafy.send2u.common.error.exception.OAuthException;
import com.ssafy.send2u.user.dto.UserInfoDto;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import com.ssafy.send2u.util.AESUtil;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RedisTemplate redisTemplate;


    @Value("${kakao.admin}")
    private String kakaoAdminKey;

    public UserInfoDto getUser(String userId) {
        User user = userRepository.findByUserId(userId);

        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setUserName(user.getUsername());

        String encryptedUserId;
        try {
            encryptedUserId = AESUtil.encrypt(user.getUserId());
        } catch (Exception e) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID입니다.");
        }
        userInfoDto.setUserId(encryptedUserId);

        userInfoDto.setUserProfileImageUrl(user.getProfileImageUrl());
        return userInfoDto;
    }

    @Transactional
    public void deleteUser(String userId) {
        
        User user = userRepository.findByUserId(userId);
        unlinkKakaoUser(user);

        redisTemplate.delete(userId);

        userRepository.delete(user);
    }

    private void unlinkKakaoUser(User user) {
        ClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(httpRequestFactory);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.set("Authorization", "KakaoAK " + kakaoAdminKey);

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("target_id_type", "user_id");
        parameters.add("target_id", user.getUserId());

        HttpEntity formEntity = new HttpEntity<>(parameters, httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                "https://kapi.kakao.com/v1/user/unlink", formEntity, String.class);

        if (responseEntity.getStatusCode().value() != 200) {
            throw new OAuthException(ErrorCode.FAIL_UNLINKING_KAKAO_ACCOUNT);
        }
    }
}
