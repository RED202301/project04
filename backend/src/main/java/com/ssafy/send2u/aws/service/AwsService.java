package com.ssafy.send2u.aws.service;

import com.ssafy.send2u.common.utils.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AwsService {

    private final S3UploadService s3UploadService;



    @Transactional
    public String fileUpload(MultipartFile file, String dir) throws IOException {
        String fileUrl = s3UploadService.saveFile(file, dir);

        System.out.println(fileUrl);

        return fileUrl;
    }

    public void fileDelete(String url)  {
        s3UploadService.deleteImage(url);
    }
}
