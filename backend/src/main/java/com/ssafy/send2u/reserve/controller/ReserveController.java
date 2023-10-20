package com.ssafy.send2u.reserve.controller;

import com.ssafy.send2u.common.response.ApiResponse;
import com.ssafy.send2u.reserve.dto.ReserveDto;
import com.ssafy.send2u.reserve.service.ReserveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/reserve")
@RequiredArgsConstructor
public class ReserveController {
    private final ReserveService reserveService;


    @GetMapping()
    public ResponseEntity<ApiResponse> getAllMessages() {
        List<ReserveDto> list = reserveService.getAllMessages();

        ApiResponse apiResponse = ApiResponse.builder()
                .message("메세지 리스트")
                .status(OK.value())
                .data(list)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> create(@RequestBody ReserveDto reserveDto) {
//        System.out.println(""reserveDto.getZIndex());
        ReserveDto response = reserveService.createMessage(reserveDto.getSenderId(), reserveDto.getReceiverId(), reserveDto.getContent(), reserveDto.getTop(), reserveDto.getReserveleft(), reserveDto.getRotate(), reserveDto.getType(), reserveDto.getZindex(), reserveDto.getBgcolor());

        ApiResponse apiResponse = ApiResponse.builder()
                .message("메세지 작성")
                .status(OK.value())
                .data(response)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

}
