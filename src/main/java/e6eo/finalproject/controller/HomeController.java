package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    private UsersDAO uDAO;




    @GetMapping("/login")
    public String login() {

        return null;
    }
}
