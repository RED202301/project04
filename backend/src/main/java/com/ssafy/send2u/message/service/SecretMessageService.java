package com.ssafy.send2u.message.service;

import com.ssafy.send2u.aws.service.AwsService;
import com.ssafy.send2u.message.dto.SecretMessageDto;
import com.ssafy.send2u.message.repository.SecretMessageRepository;
import com.ssafy.send2u.user.repository.user.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
