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
    public MessageDto createMessage(String content,
                                    Float top, Float left, Float rotate,
                                    Long zindex, Long type, Long bgcolor, Long senderId, Long receiverId,
                                    MultipartFile sourceFile, MultipartFile thumbnailFile) throws IOException {
        MessageDto messageDto;

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid sender Id:" + senderId));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid receiver Id:" + receiverId));


        String sourceFileURL = null;
        String thumbnailFileUrl = null;

        if (type == 2) {
            sourceFileURL = awsService.fileUpload(sourceFile, "image");
            thumbnailFileUrl = awsService.fileUpload(thumbnailFile,"thumbnail");
        } else if (type == 3) {
            sourceFileURL = awsService.fileUpload(sourceFile, "video");
            thumbnailFileUrl = awsService.fileUpload(thumbnailFile,"thumbnail");
        }

        Message message = new Message();
        message.setContent(content);
        message.setTop(top);
        message.setLeft(left);
        message.setRotate(rotate);
        message.setZindex(zindex);
        message.setType(type);
        message.setBgcolor(bgcolor);
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setSourceFile(sourceFileURL);
        message.setThumbnailFile(thumbnailFileUrl);

        Message savedMessage = messageRepository.save(message);

        messageDto = new MessageDto(savedMessage);

        return messageDto;
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