package com.ssafy.send2u.message.repository;

import com.ssafy.send2u.message.entity.Message;
import com.ssafy.send2u.user.entity.user.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiver(User receiver);
}
