package com.ssafy.send2u.aws.controller;

import com.ssafy.send2u.aws.dto.AwsDto;
import com.ssafy.send2u.aws.service.AwsService;
import com.ssafy.send2u.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/aws")
@RequiredArgsConstructor
public class AwsController {

    private final AwsService awsService;
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse> fileUpload(@RequestPart MultipartFile file) throws IOException {

        String ret = awsService.fileUpload(file);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("메세지 작성")
                .status(OK.value())
                .data(ret)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping()
    public ResponseEntity<ApiResponse> fileDelete(@RequestBody AwsDto awsDto)  {
        System.out.println(awsDto.getOriginalFilename());
        awsService.fileDelete(awsDto.getOriginalFilename());

        ApiResponse apiResponse = ApiResponse.builder()
                .message("메세지 작성")
                .status(OK.value())
                .data(null)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

}
