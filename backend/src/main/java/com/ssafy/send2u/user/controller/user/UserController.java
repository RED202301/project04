package com.ssafy.send2u.user.controller.user;

import com.ssafy.send2u.common.response.ApiResponse;
import com.ssafy.send2u.user.dto.UserInfoDto;
import com.ssafy.send2u.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse> getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserInfoDto user = userService.getUser(principal.getUsername());

        ApiResponse apiResponse = ApiResponse.builder()
                .message("회원정보")
                .status(OK.value())
                .data(user)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        userService.deleteUser(principal.getUsername());


        ApiResponse apiResponse = ApiResponse.builder()
                .message("회원 탈퇴 성공")
                .status(OK.value())
                .data(null)
                .build();

        return ResponseEntity.ok(apiResponse);
    }
}
