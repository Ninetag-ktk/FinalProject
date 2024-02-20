package e6eo.finalproject.dao;

import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Scanner;

@Service
@Transactional
@RequiredArgsConstructor
public class UsersDAO {

    private final UsersMapper usersMapper;

    public void signup() {

        Scanner s = new Scanner(System.in);
        System.out.print("아이디 입력 : ");
        String id = s.next();
        System.out.print("비밀번호 입력 : ");
        String pw = s.next();
        System.out.print("닉네임 입력 : ");
        String name = s.next();

        Users user = Users.builder()
                .UserID(id)
                .PW(pw)
                .NickName(name)
                .InnerID(null)
                .build();

        Optional<Users> users = usersMapper.findById(id);

        if (users.isEmpty()) {
            usersMapper.save(user);
            System.out.println("성공");
        } else {
            System.out.println("실패!");
        }
    }



}
