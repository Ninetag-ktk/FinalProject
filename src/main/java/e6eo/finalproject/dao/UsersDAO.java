package e6eo.finalproject.dao;

import e6eo.finalproject.dto.UsersMapper;

import e6eo.finalproject.entity.UsersEntity;

import jakarta.persistence.metamodel.SetAttribute;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.SessionAttribute;

@Service
@Transactional
@RequiredArgsConstructor
public class UsersDAO {
    @Autowired
    private final UsersMapper usersMapper;
    private UsersEntity usersEntity;


    public void userJoin(@RequestBody UsersEntity users) {
        Optional<UsersEntity> user = usersMapper.findById(users.getUserId());


        if (user.isEmpty()) {
            usersMapper.save(users);
            System.out.println("성공");
        } else {
            System.out.println("실패!");
        }
    }

    public String idCheck(String id, String pw, HttpServletRequest req) {
        Optional<UsersEntity> user = usersMapper.findById(id);

        System.out.println(user);
        if (user.isEmpty()) {
            System.out.println("아이디 없음");
            return "아이디없음";
        } else {
            if (pw.equals(user.get().getPw())) {
                req.getSession().setAttribute("user", user.get());
                req.getSession().setMaxInactiveInterval(60);
                return "로그인";
            } else {
                System.out.println("비번불일치");
                return "비번불일치";
            }
        }

    }

    public void makeSesison() {
        HttpSession session = HttpServletRequest

    }



    public void findAll() {
        List<UsersEntity> users = usersMapper.findAll();
        for (UsersEntity user : users) {
            System.out.println(user);
        }
    }




}
