package com.ssafy.send2u.article.controller;

//import com.ssafy.send2u.article.domain.UploadFile;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.send2u.article.dto.ArticleDto;
import com.ssafy.send2u.article.service.ArticleService;
import com.ssafy.send2u.common.response.ApiResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"article"}, description = "문의게시판")
@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @ApiOperation(value = "전체게시판조회")
    @GetMapping()
    public ResponseEntity<ApiResponse> getAllArticles() {
        List<ArticleDto> list = articleService.getAllArticles();

        ApiResponse apiResponse = ApiResponse.builder()
                .message("게시판 리스트")
                .status(OK.value())
                .data(list)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "게시판하나조회")
    @GetMapping("/{articleId}")
    public ResponseEntity<ApiResponse> getArticle(@PathVariable Long articleId) {
        ArticleDto articleDto = articleService.getArticleById(articleId);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("게시판 하나 조회")
                .status(OK.value())
                .data(articleDto)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "내가 작성한 게시글 조회")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse> getMyArticles() {
        List<ArticleDto> myArticles = articleService.getMyArticles();

        ApiResponse apiResponse = ApiResponse.builder()
                .message("내가 작성한 게시글 리스트")
                .status(OK.value())
                .data(myArticles)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "게시글 작성")
    @PostMapping()
    public ResponseEntity<ApiResponse> addArticle(@RequestBody ArticleDto.Request articleRequest) {

        ArticleDto createdArticleDto = articleService.addArticle(articleRequest);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("만든 게시판")
                .status(OK.value())
                .data(createdArticleDto)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "내 게시글 삭제")
    @DeleteMapping("/{articleId}")
    public ResponseEntity<ApiResponse> deleteArticle(@PathVariable Long articleId) {
        Long deletedId = articleService.deleteArticle(articleId);

        Map<String, Long> data = new HashMap<>();
        data.put("id", deletedId);

        ApiResponse apiResponse = ApiResponse.builder()
                .message(deletedId + "번 ID 아티클 삭제")
                .status(OK.value())
                .data(data)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @ApiOperation(value = "내 게시글 수정")
    @PutMapping("/{articleId}")
    public ResponseEntity<ApiResponse> updateArticle(@PathVariable Long articleId,
                                                     @RequestBody ArticleDto.Request updatedArticleDto) {
        ArticleDto updatedArticle = articleService.updateArticle(articleId, updatedArticleDto);

        ApiResponse apiResponse = ApiResponse.builder()
                .message(articleId + "번 ID 아티클 수정 완료")
                .status(OK.value())
                .data(updatedArticle)
                .build();

        return ResponseEntity.ok(apiResponse);
    }
}


