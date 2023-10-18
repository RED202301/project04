package com.ssafy.send2u.message.repository;

import com.ssafy.send2u.message.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
