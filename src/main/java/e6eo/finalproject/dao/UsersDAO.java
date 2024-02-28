package e6eo.finalproject.dao;

import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.UsersEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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


    public UsersEntity idCheck(String id, String pw, HttpServletRequest req) {
        Optional<UsersEntity> user = usersMapper.findById(id);
        HttpSession session = req.getSession();
        req.setAttribute("returnTest", "check");

        System.out.println(user);
        if (user.isEmpty()) {
            System.out.println("아이디 없음");
            return null;
        } else {
            if (pw.equals(user.get().getPw())) {
                session.setAttribute("user", user.get());
                session.setMaxInactiveInterval(60 * 2);
                return user.get();
            } else {
                System.out.println("비번불일치");
                return null;
            }
        }
    }

    public void loginCheck(HttpServletRequest req) {
        UsersEntity m = (UsersEntity) req.getSession().getAttribute("user");
        System.out.println(m);
    }


    public void findAll() {
        List<UsersEntity> users = usersMapper.findAll();
        for (UsersEntity user : users) {
            System.out.println(user);
        }
    }
}
