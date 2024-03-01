package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import e6eo.finalproject.entity.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UsersDAO usersDao;

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



