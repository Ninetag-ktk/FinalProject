package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import e6eo.finalproject.entity.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UsersDAO usersDao;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
//        System.out.println(req.get("id"));
//        System.out.println(req.get("pw"));
        return usersDao.login(req.get("id"), req.get("pw"));
    }

    @PostMapping("/join")
    public String userJoin(@RequestBody UsersEntity users) {
        usersDao.userJoin(users);
        return null;
    }

    @PostMapping("/test")
    public String test(@RequestParam UsersEntity users) {
//        uDao.findAll();
        users.getUserId();
        return null;

    }

}



