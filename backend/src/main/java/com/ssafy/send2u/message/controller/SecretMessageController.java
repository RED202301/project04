package com.ssafy.send2u.message.controller;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.send2u.common.response.ApiResponse;
import com.ssafy.send2u.message.dto.SecretMessageDto;
import com.ssafy.send2u.message.service.SecretMessageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Api(tags = {"secretMessage"}, description = "비밀메시지")
@RestController
@RequestMapping("/api/v1/secretMessages")
@RequiredArgsConstructor
public class SecretMessageController {
    private final SecretMessageService secretMessageService;

    @ApiOperation(value = "비밀메시지전체조회")
    @GetMapping()
    public ResponseEntity<ApiResponse> getAllSecretMessages() {
        List<SecretMessageDto> list = secretMessageService.getAllSecretMessages();

        ApiResponse apiResponse = ApiResponse.builder()
                .message("비밀메시지 리스트")
                .status(OK.value())
                .data(list)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "내비밀메시지조회")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getUserReceivedMessages(
            @RequestParam(required = false) String receiverId) {
        List<SecretMessageDto> list = secretMessageService.getUserReceivedSecretMessages(receiverId);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("받은 비밀메세지 리스트")
                .status(OK.value())
                .data(list)
                .build();

        return ResponseEntity.ok(apiResponse);
    }


    @ApiOperation(value = "받은 비밀메시지 수 조회")
    @GetMapping("/count")
    public ResponseEntity<ApiResponse> getUserReceivedSecretMessagesCount(
            @RequestParam(required = false) String receiverId) {
        int count = secretMessageService.getUserReceivedSecretMessagesCount(receiverId);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("받은 메세지 수")
                .status(OK.value())
                .data(count)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "비밀일기생성")
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse> createSecretMessage(
            @Valid @ModelAttribute SecretMessageDto secretMessageDto,
            @RequestPart(value = "sourceFile", required = false) MultipartFile sourceFile,
            @RequestPart(value = "thumbnailFile", required = false) MultipartFile thumbnailFile)
            throws IOException {

        SecretMessageDto response = secretMessageService.createSecretMessage(secretMessageDto, sourceFile,
                thumbnailFile);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("비밀메시지작성")
                .status(OK.value())
                .data(response)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "비밀일기삭제")
    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteSecretMessage(@PathVariable Long messageId) {
        Long deletedId = secretMessageService.deleteSecretMessage(messageId);

        Map<String, Long> data = new HashMap<>();
        data.put("id", deletedId);

        ApiResponse apiResponse = ApiResponse.builder()
                .message(messageId + "번 ID 메세지 삭제")
                .status(OK.value())
                .data(data)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

}
