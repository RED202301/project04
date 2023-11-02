package com.ssafy.send2u.message.controller;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.send2u.common.response.ApiResponse;
import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.service.MessageService;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Api(tags = {"message"}, description = "일반메시지")
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
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getUserReceivedMessages(@RequestParam(required = false) String receiverId) {
        List<MessageDto> list = messageService.getUserReceivedMessages(receiverId);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("받은 메세지 리스트")
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
    @PutMapping("/{messageId}")
    public ResponseEntity<ApiResponse> updateMessage(@PathVariable Long messageId, @RequestBody MessageDto messageDto) {
        MessageDto updatedMessage = messageService.updateMessage(messageId, messageDto.getTop(), messageDto.getLeft(),
                messageDto.getRotate(), messageDto.getZindex());

        ApiResponse apiResponse = ApiResponse.builder()
                .message(messageId + "번 메시지 수정")
                .status(OK.value())
                .data(updatedMessage)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "일기삭제")
    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteMessage(@PathVariable Long messageId) {
        Long deletedId = messageService.deleteMessage(messageId);

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