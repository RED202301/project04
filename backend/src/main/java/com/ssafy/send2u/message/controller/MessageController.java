package com.ssafy.send2u.message.controller;

import com.ssafy.send2u.common.response.ApiResponse;
import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.service.MessageService;
import com.ssafy.send2u.user.repository.user.UserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.IOException;
import java.nio.file.LinkOption;
import javax.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.HttpStatus.OK;

@Api(tags = {"message"}, description = "일단이것만사용하세요하세요하세요하세요")
@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;


    @ApiOperation(value = "전체메시지조회")
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
    @ApiOperation(value = "내메시지조회")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse> getUserReceivedMessages() {
        List<MessageDto> list = messageService.getUserReceivedMessages();

        ApiResponse apiResponse = ApiResponse.builder()
                .message("내가 받은 메세지 리스트")
                .status(OK.value())
                .data(list)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "일기생성")
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse> createMessage(
            @Valid @ModelAttribute MessageDto messageDto,
            @RequestPart(value = "sourceFile", required = false) MultipartFile sourceFile,
            @RequestPart(value = "thumbnailFile", required = false) MultipartFile thumbnailFile)
            throws IOException {

        MessageDto response = messageService.createMessage(messageDto, sourceFile, thumbnailFile);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("메세지 작성")
                .status(OK.value())
                .data(response)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "일기수정", notes = "#######top,left,rotate,zindex만 넣으면됨######")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateMessage(@PathVariable Long id, @RequestBody MessageDto messageDto) {
        MessageDto updatedMessage = messageService.updateMessage(id, messageDto.getTop(), messageDto.getLeft(),
                messageDto.getRotate(), messageDto.getZindex());

        ApiResponse apiResponse = ApiResponse.builder()
                .message(id + "번 메시지 수정")
                .status(OK.value())
                .data(updatedMessage)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "일기삭제")
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