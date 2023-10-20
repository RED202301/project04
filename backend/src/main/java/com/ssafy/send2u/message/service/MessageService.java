package com.ssafy.send2u.message.service;

import com.ssafy.send2u.message.dto.MessageDto;
import com.ssafy.send2u.message.entity.Message;
import com.ssafy.send2u.message.repository.MessageRepository;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
                .map(message -> new MessageDto(message.getId(), message.getContent(),message.getSender().getUserSeq(), message.getReceiver().getUserSeq()))
                .collect(Collectors.toList());
    }

    @Transactional
    public MessageDto createMessage(Long senderId, Long receiverId, String content) {
        MessageDto messageDto;

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid sender Id:" + senderId));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid receiver Id:" + receiverId));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        Message savedMessage = messageRepository.save(message);

        messageDto = new MessageDto(savedMessage.getId(), savedMessage.getContent(), savedMessage.getSender().getUserSeq(), savedMessage.getReceiver().getUserSeq());
        return messageDto;
    }

}