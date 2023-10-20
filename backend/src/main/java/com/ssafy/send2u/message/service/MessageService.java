package com.ssafy.send2u.message.service;

import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.entity.Message;
import com.ssafy.send2u.message.repository.MessageRepository;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<MessageDto> getAllMessages() {
        return messageRepository.findAll().stream()
                .map(message -> new MessageDto(message.getId(),
                        message.getContent(),
                        message.getTop(),
                        message.getLeft(),
                        message.getRotate(),
                        message.getZIndex(),
                        message.getType(),
                        message.getBgcolor(),
                        message.getCreatedAt(),
                        message.getSender().getUserSeq(),
                        message.getReceiver().getUserSeq()))
                .collect(Collectors.toList());
    }

    @Transactional
    public MessageDto createMessage(String content,
                                    Float top, Float left, Float rotate,
                                    Long zIndex, Long type, Long bgcolor, Long senderId, Long receiverId) {
        MessageDto messageDto;

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid sender Id:" + senderId));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid receiver Id:" + receiverId));

        Message message = new Message();
        message.setContent(content);
        message.setTop(top);
        message.setLeft(left);
        message.setRotate(rotate);
        message.setZIndex(zIndex);
        message.setType(type);
        message.setBgcolor(bgcolor);
        message.setSender(sender);
        message.setReceiver(receiver);

        Message savedMessage = messageRepository.save(message);

        messageDto = new MessageDto(savedMessage.getId(), savedMessage.getContent(),
                savedMessage.getTop(), savedMessage.getLeft(),
                savedMessage.getRotate(), savedMessage.getZIndex(),
                savedMessage.getType(), savedMessage.getBgcolor(), savedMessage.getCreatedAt(), savedMessage.getSender().getUserSeq(),
                savedMessage.getReceiver().getUserSeq());
        return messageDto;
    }

}