package com.ssafy.send2u.message.controller;

import com.ssafy.send2u.common.ApiResponse;
import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.entity.Message;
import com.ssafy.send2u.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;


    @GetMapping()
    public ApiResponse getAllMessages() {
        List<MessageDto.Response> list = messageService.getAllMessages();
        return ApiResponse.success("data",list);
    }

    @PostMapping()
    public ApiResponse create(@RequestParam Long senderId, @RequestBody MessageDto.CreateRequest request) {
        MessageDto.Response response = messageService.createMessage(senderId, request.getContent());
        return ApiResponse.success("data", response);
    }

}
