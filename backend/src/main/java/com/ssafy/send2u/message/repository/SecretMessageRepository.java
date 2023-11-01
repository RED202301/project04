package com.ssafy.send2u.message.repository;

import com.ssafy.send2u.message.entity.SecretMessage;
import com.ssafy.send2u.user.entity.user.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecretMessageRepository extends JpaRepository<SecretMessage, Long> {
    List<SecretMessage> findByReceiver(User receiver);
}
