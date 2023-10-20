package com.ssafy.send2u.reserve.service;

import com.ssafy.send2u.reserve.dto.ReserveDto;
import com.ssafy.send2u.reserve.entity.Reserve;
import com.ssafy.send2u.reserve.repository.ReserveRepository;
import com.ssafy.send2u.user.entity.user.User;
import com.ssafy.send2u.user.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReserveService {

    private final ReserveRepository reserveRepository;
    private final UserRepository userRepository;



    @Transactional
    public List<ReserveDto> getAllMessages() {
        return reserveRepository.findAll().stream()
                .map(reserve -> new ReserveDto(reserve.getId(), reserve.getContent(),reserve.getSender().getUserSeq(), reserve.getReceiver().getUserSeq(), reserve.getTop(), reserve.getReserveleft(), reserve.getRotate(), reserve.getZindex(), reserve.getType(), reserve.getBgcolor()))
                .collect(Collectors.toList());
    }

    @Transactional
    public ReserveDto createMessage(Long senderId, Long receiverId, String content, Double top, Double reserveleft, Double rotate, Integer type, Integer zindex, Integer bgcolor) {
        ReserveDto reserveDto;

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid sender Id:" + senderId));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid receiver Id:" + receiverId));

        Reserve reserve = new Reserve();
        reserve.setSender(sender);
        reserve.setReceiver(receiver);
        reserve.setContent(content);
        reserve.setTop(top);
        reserve.setReserveleft(reserveleft);
        reserve.setBgcolor(bgcolor);
        reserve.setRotate(rotate);
        reserve.setType(type);
        reserve.setZindex(zindex);


        Reserve savedReserve = reserveRepository.save(reserve);

        reserveDto = new ReserveDto(
                savedReserve.getId(),
                savedReserve.getContent(),
                savedReserve.getSender().getUserSeq(),
                savedReserve.getReceiver().getUserSeq(),
                savedReserve.getTop(),
                savedReserve.getReserveleft(),
                savedReserve.getRotate(),
                savedReserve.getZindex(),
                savedReserve.getType(),
                savedReserve.getBgcolor());
        return reserveDto;
    }

}
