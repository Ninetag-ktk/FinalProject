package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UsersDAO usersDao;

    @Autowired
    private UsersMapper usersMapper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
//        System.out.println(req.get("id"));
//        System.out.println(req.get("pw"));
        return usersDao.login(req.get("id"), req.get("pw"));
    }

    @PostMapping("/join")
    public ResponseEntity<?> userJoin(@RequestBody UsersEntity users) {
        return usersDao.userJoin(users);
    }

    @PostMapping("/test")
    public String test(@RequestParam UsersEntity users) {
//        uDao.findAll();
        users.getUserId();
        return null;
    }

    @PostMapping("/checkToken")
    public ResponseEntity<?> checkObserve(@RequestBody String observe) {
        Optional<UsersEntity> user = usersMapper.findByObserveToken(observe);
        return user.isEmpty() ? ResponseEntity.ok(true) : ResponseEntity.ok(false);
    }
}



