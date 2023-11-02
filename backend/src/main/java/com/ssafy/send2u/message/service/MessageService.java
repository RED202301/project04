package com.ssafy.send2u.message.service;

import com.ssafy.send2u.aws.service.AwsService;
import com.ssafy.send2u.common.error.ErrorCode;
import com.ssafy.send2u.common.error.exception.NoAuthorizationException;
import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.entity.Message;
import com.ssafy.send2u.message.repository.MessageRepository;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final AwsService awsService;

    @Transactional
    public List<MessageDto> getAllMessages() {
        List<MessageDto> list = messageRepository.findAll().stream().map(MessageDto::new).collect(Collectors.toList());
        return list;
    }

    @Transactional
    public MessageDto getMessage(Long messageId) {
        Message Message = messageRepository.findById(messageId).orElseThrow(() -> new IllegalArgumentException("Invalid message Id: " + messageId));
        return new MessageDto(Message);
    }

    @Transactional
    public List<MessageDto> getUserReceivedMessages(String userId) {
        User user;

        if (userId == null || userId.isEmpty()) {
            // userId가 주어지지 않은 경우 현재 인증된 사용자 정보를 가져옴
            org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                    .getAuthentication().getPrincipal();

            user = userRepository.findByUserId(principal.getUsername());
        } else {
            // userId가 주어진 경우 해당 사용자 정보를 가져옴
            user = userRepository.findByUserId(userId);
        }

        if (user == null) {
            // 유효하지 않은 사용자 ID인 경우 예외 처리
            throw new IllegalArgumentException("유효하지 않은 사용자 ID입니다.");
        }

        List<Message> messages = messageRepository.findByReceiver(user);

        return messages.stream().map(MessageDto::new).collect(Collectors.toList());
    }

    @Transactional
    public MessageDto createMessage(MessageDto messageDto, MultipartFile sourceFile, MultipartFile thumbnailFile)
            throws IOException {

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

//        User sender = userRepository.findById(senderId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid sender Id:" + senderId));
        User sender = userRepository.findByUserId(principal.getUsername());
        User receiver = userRepository.findByUserId(messageDto.getReceiverId());

        String sourceFileURL = null;
        String thumbnailFileUrl = null;

        if (messageDto.getType() == 2 && sourceFile != null && thumbnailFile != null) {
            sourceFileURL = awsService.fileUpload(sourceFile, "image");
            thumbnailFileUrl = awsService.fileUpload(thumbnailFile, "thumbnail");
        } else if (messageDto.getType() == 3 && sourceFile != null && thumbnailFile != null) {
            sourceFileURL = awsService.fileUpload(sourceFile, "video");
            thumbnailFileUrl = awsService.fileUpload(thumbnailFile, "thumbnail");
        }

        Message message = new Message();
        message.setContent(messageDto.getContent());
        message.setTop(messageDto.getTop());
        message.setLeft(messageDto.getLeft());
        message.setRotate(messageDto.getRotate());
        message.setZindex(messageDto.getZindex());
        message.setType(messageDto.getType());
        message.setBgcolor(messageDto.getBgcolor());
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setSourceFileUrl(sourceFileURL);
        message.setThumbnailFileUrl(thumbnailFileUrl);

        Message savedMessage = messageRepository.save(message);

        return new MessageDto(savedMessage);
    }

    @Transactional
    public MessageDto updateMessage(Long messageId, Float top, Float left, Float rotate, Long zindex) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid message Id: " + messageId));

        if (top != null) {
            message.setTop(top);
        }
        if (left != null) {
            message.setLeft(left);
        }
        if (rotate != null) {
            message.setRotate(rotate);
        }
        if (zindex != null) {
            message.setZindex(zindex);
        }

        Message updatedMessage = messageRepository.save(message);

        return new MessageDto(updatedMessage);
    }

    @Transactional
    public Long deleteMessage(Long messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid message Id: " + messageId));

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User currentUser = userRepository.findByUserId(principal.getUsername());

        // 본인이 적은 글인지 확인
        if (!message.getSender().equals(currentUser)) {
            throw new NoAuthorizationException(ErrorCode.NO_Authorization);
        }

        // 파일이 있는 경우 S3에서도 삭제
        if (message.getSourceFileUrl() != null) {
            awsService.fileDelete(message.getSourceFileUrl());
        }
        if (message.getThumbnailFileUrl() != null) {
            awsService.fileDelete(message.getThumbnailFileUrl());
        }
        messageRepository.deleteById(messageId);
        return messageId;
    }

}