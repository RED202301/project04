package com.ssafy.send2u.message.controller;

import com.ssafy.send2u.common.response.ApiResponse;
import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.service.MessageService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<ApiResponse> createMessage(@RequestPart(value = "message", required = false) MessageDto messageDto,
                                                     @RequestPart(value = "sourceFile", required = false) MultipartFile sourceFile,
                                                     @RequestPart(value = "thumbnailFile", required = false) MultipartFile thumbnailFile)
            throws IOException {
        MessageDto response = messageService.createMessage(
                messageDto.getContent(),
                messageDto.getTop(),
                messageDto.getLeft(),
                messageDto.getRotate(),
                messageDto.getZindex(),
                messageDto.getType(),
                messageDto.getBgcolor(),
                messageDto.getSenderId(),
                messageDto.getReceiverId(),
                sourceFile,
                thumbnailFile);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("메세지 작성")
                .status(OK.value())
                .data(response)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteMessage(@PathVariable Long id) {
        Long deletedId = messageService.deleteMessage(id);

        Map<String, Long> data = new HashMap<>();
        data.put("id", deletedId);

        ApiResponse apiResponse = ApiResponse.builder()
                .message(id + "번 ID 메세지 삭제")
                .status(OK.value())
                .data(data)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

}