package com.ssafy.send2u.message.service;

import com.ssafy.send2u.aws.service.AwsService;
import com.ssafy.send2u.message.dto.SecretMessageDto;
import com.ssafy.send2u.message.entity.SecretMessage;
import com.ssafy.send2u.message.repository.SecretMessageRepository;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import java.io.IOException;
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

    public User getUser(String userId) {
        User user;

        if (userId == null || userId.isEmpty()) {
            org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                    .getAuthentication().getPrincipal();

            user = userRepository.findByUserId(principal.getUsername());
        } else {
            user = userRepository.findByUserId(userId);
        }

        if (user == null) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID입니다.");
        }

        return user;
    }

    @Transactional
    public List<SecretMessageDto> getUserReceivedSecretMessages(String userId) {
        User user = getUser(userId);
        List<SecretMessage> messages = secretMessageRepository.findByReceiver(user);

        return messages.stream().map(SecretMessageDto::new).collect(Collectors.toList());
    }

    @Transactional
    public int getUserReceivedSecretMessagesCount(String userId) {
        User user = getUser(userId);
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
        User receiver = userRepository.findByUserId(secretMessageDto.getReceiverId());

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
    public Long deleteSecretMessage(Long id) {
        if (!secretMessageRepository.existsById(id)) {
            throw new IllegalArgumentException("Invalid message Id: " + id);
        }
        secretMessageRepository.deleteById(id);
        return id;
    }

}
