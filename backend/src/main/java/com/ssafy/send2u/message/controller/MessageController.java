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
        List<MessageDto> list = messageService.getAllMessages();

        ApiResponse apiResponse = ApiResponse.builder()
                .message("메세지 리스트")
                .status(OK.value())
                .data(list)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> create(@RequestBody MessageDto messageDto) {
        MessageDto response = messageService.createMessage(messageDto.getSenderId(), messageDto.getReceiverId(), messageDto.getContent());

        ApiResponse apiResponse = ApiResponse.builder()
                .message("메세지 작성")
                .status(OK.value())
                .data(response)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

}