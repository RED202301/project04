package com.ssafy.send2u.message.service;

import com.ssafy.send2u.aws.service.AwsService;
import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.entity.Message;
import com.ssafy.send2u.message.repository.MessageRepository;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;

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
    public MessageDto createMessage(MessageDto messageDto, MultipartFile sourceFile, MultipartFile thumbnailFile)
            throws IOException {

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

//        User sender = userRepository.findById(senderId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid sender Id:" + senderId));
        User sender = userRepository.findByUserId(principal.getUsername());
        User receiver = userRepository.findById(messageDto.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid receiver Id:" + messageDto.getReceiverId()));

        String sourceFileURL = null;
        String thumbnailFileUrl = null;

        if (messageDto.getType() == 2) {
            sourceFileURL = awsService.fileUpload(sourceFile, "image");
            thumbnailFileUrl = awsService.fileUpload(thumbnailFile, "thumbnail");
        } else if (messageDto.getType() == 3) {
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
        message.setSourceFile(sourceFileURL);
        message.setThumbnailFile(thumbnailFileUrl);

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
    public Long deleteMessage(Long id) {
        if (!messageRepository.existsById(id)) {
            throw new IllegalArgumentException("Invalid message Id: " + id);
        }
        messageRepository.deleteById(id);
        return id;
    }

}