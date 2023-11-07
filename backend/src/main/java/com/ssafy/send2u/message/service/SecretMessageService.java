package com.ssafy.send2u.message.service;

import com.ssafy.send2u.aws.service.AwsService;
import com.ssafy.send2u.common.error.ErrorCode;
import com.ssafy.send2u.common.error.exception.NoAuthorizationException;
import com.ssafy.send2u.message.dto.SecretMessageDto;
import com.ssafy.send2u.message.entity.SecretMessage;
import com.ssafy.send2u.message.repository.SecretMessageRepository;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import com.ssafy.send2u.util.AESUtil;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class SecretMessageService {
    private final SecretMessageRepository secretMessageRepository;
    private final UserRepository userRepository;
    private final AwsService awsService;

    @Transactional
    public List<SecretMessageDto> getAllSecretMessages() {
        List<SecretMessageDto> list = secretMessageRepository.findAll()
                .stream()
                .map(SecretMessageDto::new)
                .collect(Collectors.toList());
        return list;
    }

    @Transactional
    public List<SecretMessageDto> getUserReceivedSecretMessages(String encryptedReceiverId) {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime targetDateTime = LocalDateTime.of(2023, 11, 17, 16, 45);

        String userId;

        try {
            userId = AESUtil.decrypt(encryptedReceiverId);
        } catch (Exception e) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID입니다.");
        }

        User user = userRepository.findByUserId(userId);
        List<SecretMessage> messages = secretMessageRepository.findByReceiver(user);

        if (now.isBefore(targetDateTime)) {
            return messages.stream().map(msg -> {
                SecretMessageDto dto = new SecretMessageDto(msg);
                dto.setContent("11월 17일 16시 45분 공개");
                dto.setThumbnailFileUrl("https://send2u.s3.ap-northeast-2.amazonaws.com/thumbnail/dummyImage.png");
                dto.setSourceFileUrl("https://send2u.s3.ap-northeast-2.amazonaws.com/thumbnail/dummyImage.png");
                return dto;
            }).collect(Collectors.toList());
        } else {
            // 현재 시간이 목표 시간 이후이면 그대로 반환
            return messages.stream().map(SecretMessageDto::new).collect(Collectors.toList());
        }
    }

    @Transactional
    public int getUserReceivedSecretMessagesCount(String encryptedReceiverId) {

        String userId;
        try {
            userId = AESUtil.decrypt(encryptedReceiverId);
        } catch (Exception e) {

            throw new IllegalArgumentException("유효하지 않은 사용자 ID입니다.");
        }

        User user = userRepository.findByUserId(userId);
        List<SecretMessage> messages = secretMessageRepository.findByReceiver(user);
        return messages.size();
    }

    @Transactional
    public SecretMessageDto createSecretMessage(SecretMessageDto secretMessageDto, MultipartFile sourceFile,
                                                MultipartFile thumbnailFile)
            throws IOException {

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User sender = userRepository.findByUserId(principal.getUsername());

        String receiverId;
        try {
            receiverId = AESUtil.decrypt(secretMessageDto.getReceiverId());
        } catch (Exception e) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID입니다.");
        }

        User receiver = userRepository.findByUserId(receiverId);

        String sourceFileURL = null;
        String thumbnailFileUrl = null;

        if (secretMessageDto.getType() == 2 && sourceFile != null && thumbnailFile != null) {
            sourceFileURL = awsService.fileUpload(sourceFile, "image");
            thumbnailFileUrl = awsService.fileUpload(thumbnailFile, "thumbnail");
        } else if (secretMessageDto.getType() == 3 && sourceFile != null && thumbnailFile != null) {
            sourceFileURL = awsService.fileUpload(sourceFile, "video");
            thumbnailFileUrl = awsService.fileUpload(thumbnailFile, "thumbnail");
        }

        SecretMessage secretMessage = new SecretMessage();
        secretMessage.setContent(secretMessageDto.getContent());
        secretMessage.setTop(secretMessageDto.getTop());
        secretMessage.setLeft(secretMessageDto.getLeft());
        secretMessage.setRotate(secretMessageDto.getRotate());
        secretMessage.setZindex(secretMessageDto.getZindex());
        secretMessage.setType(secretMessageDto.getType());
        secretMessage.setBgcolor(secretMessageDto.getBgcolor());
        secretMessage.setSender(sender);
        secretMessage.setReceiver(receiver);
        secretMessage.setSourceFileUrl(sourceFileURL);
        secretMessage.setThumbnailFileUrl(thumbnailFileUrl);

        SecretMessage savedMessage = secretMessageRepository.save(secretMessage);

        return new SecretMessageDto(savedMessage);
    }

    @Transactional
    public Long deleteSecretMessage(Long messageId) {
        SecretMessage secretMessage = secretMessageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid message Id: " + messageId));

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User currentUser = userRepository.findByUserId(principal.getUsername());

        // 본인이 적은 글, 방주인만지울수있음
        if (!secretMessage.getReceiver().equals(currentUser) && !secretMessage.getSender().equals(currentUser)) {
            throw new NoAuthorizationException(ErrorCode.NO_Authorization);
        }

        // 파일이 있는 경우 S3에서도 삭제
        if (secretMessage.getSourceFileUrl() != null) {
            awsService.fileDelete(secretMessage.getSourceFileUrl());
        }
        if (secretMessage.getThumbnailFileUrl() != null) {
            awsService.fileDelete(secretMessage.getThumbnailFileUrl());
        }
        secretMessageRepository.deleteById(messageId);
        return messageId;
    }

}
