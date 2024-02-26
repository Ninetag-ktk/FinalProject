package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import e6eo.finalproject.entity.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/test")
    public String test(@RequestParam UsersEntity users){

        uDao.findAll();
        users.getUserId();

        return null;

    }

}



