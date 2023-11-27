//package com.ssafy.send2u.reserve.entity;
//
//import com.ssafy.send2u.user.entity.user.User;
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//@Getter
//@Setter
//@Entity
//@Table(name = "reserve")
//public class Reserve {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String content;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "sender_id")
//    private User sender;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "receiver_id")
//    private User receiver;
//
//    private Double top;
//
//    private Double reserveleft;
//
//    private Double rotate;
//
//    private Integer zindex;
//
//    private Integer type;
//
//    private Integer bgcolor;
//
//}
