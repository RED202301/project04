package com.ssafy.send2u.message.controller;

import com.ssafy.send2u.common.response.ApiResponse;
import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;


    @GetMapping()
    public ResponseEntity<ApiResponse> getAllMessages() {
        List<MessageDto.Response> list = messageService.getAllMessages();

        ApiResponse apiResponse = ApiResponse.builder()
                .message("회원정보")
                .status(OK.value())
                .data(list)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> create(@RequestParam Long senderId, @RequestBody MessageDto.CreateRequest request) {
        MessageDto.Response response = messageService.createMessage(senderId, request.getContent());

        ApiResponse apiResponse = ApiResponse.builder()
                .message("회원정보")
                .status(OK.value())
                .data(response)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

}
