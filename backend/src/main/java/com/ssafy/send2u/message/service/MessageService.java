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
    public List<MessageDto.Response> getAllMessages() {
        return messageRepository.findAll().stream()
                .map(message -> new MessageDto.Response(message.getId(), message.getContent(), message.getSender().getUserSeq()))
                .collect(Collectors.toList());
    }

    @Transactional
    public MessageDto.Response createMessage(Long senderId, String content) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid sender Id:" + senderId));
        Message message = new Message();
        message.setSender(sender);
        message.setContent(content);
        Message savedMessage = messageRepository.save(message);
        return new MessageDto.Response(savedMessage.getId(), savedMessage.getContent(), savedMessage.getSender().getUserSeq());
    }

}
