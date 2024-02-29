package e6eo.finalproject.dao;

import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.UsersEntity;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.RequestBody;


@Service
@Transactional
@RequiredArgsConstructor
public class UsersDAO {


    @Autowired
    private final UsersMapper usersMapper;
    private final TokenManager tokenManager;
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


    public String idCheck(String id, String pw, HttpServletRequest req, HttpServletResponse res) {
        Optional<UsersEntity> user = usersMapper.findById(id);
        String cookieToken = tokenManager.setObserve(id);
        Cookie cookie = new Cookie(id, cookieToken);


        System.out.println(user);
        if (user.isEmpty()) {
            System.out.println("아이디 없음");
            return "아이디 없음";
        } else {
            if (pw.equals(user.get().getPw())) {
                System.out.println(cookie);
                res.addCookie(cookie);
                return "로그인";
            } else {
                System.out.println("비번불일치");
                return "비번불일치";
            }
        }
    }


    public void findAll() {
        List<UsersEntity> users = usersMapper.findAll();
        for (UsersEntity user : users) {
            System.out.println(user);
        }
    }

}
