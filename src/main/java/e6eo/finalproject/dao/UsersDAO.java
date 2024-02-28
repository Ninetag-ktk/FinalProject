package e6eo.finalproject.dao;

import e6eo.finalproject.dto.UsersMapper;

import e6eo.finalproject.entity.UsersEntity;

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

@Service
@Transactional
@RequiredArgsConstructor
public class UsersDAO {
    @Autowired
    private final UsersMapper usersMapper;
    private UsersEntity usersEntity;


    public void userJoin(@RequestBody UsersEntity users){
        Optional<UsersEntity> user = usersMapper.findById(users.getUserId());


        if (user.isEmpty()) {
            usersMapper.save(users);
            System.out.println("성공");
        } else {
            System.out.println("실패!");
        }
    }

    public void idCheck(String id){
//        List<UsersEntity> user = usersMapper.findByInnerId(id);
        Optional<UsersEntity> user = usersMapper.findById(id);
        System.out.println(user);
        if (user.isEmpty()) {
            System.out.println("로그인 실패");
        } else {
            System.out.println("로그인 성공");
        }
    }

    public void  pwCheck(String id, String pw){
        Optional<UsersEntity> user = usersMapper.findById(id);
        if (user.isPresent()) {
            if (pw.equals(user.get().getPw())) {
                System.out.println("비번일치");
            } else {
                System.out.println("비번불일치");
            }
        }

    }



    public void findAll() {
        List<UsersEntity> users = usersMapper.findAll();
        for (UsersEntity user : users) {
            System.out.println(user);
        }
    }

    public void makeSession() {

    }



}
