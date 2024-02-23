package e6eo.finalproject.dao;

import e6eo.finalproject.dto.UsersMapper;

import e6eo.finalproject.entity.UsersEntity;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Scanner;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Transactional
@RequiredArgsConstructor
public class UsersDAO {
    @Autowired
    private final UsersMapper usersMapper;


    public void userJoin(@RequestBody UsersEntity users){
        Optional<UsersEntity> user = usersMapper.findById(users.getUserID());


        if (user.isEmpty()) {
            usersMapper.save(users);
            System.out.println("성공");
        } else {
            System.out.println("실패!");
        }
    }



}
