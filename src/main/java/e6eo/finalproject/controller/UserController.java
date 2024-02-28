package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import e6eo.finalproject.entity.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UsersDAO uDao;

    @PostMapping("/join")

    public String userJoin(@RequestBody UsersEntity users){
            uDao.userJoin(users);

        return null;
    }

    @GetMapping("/test")
    public String test(){
        uDao.findAll();
        return null;
    }
}
