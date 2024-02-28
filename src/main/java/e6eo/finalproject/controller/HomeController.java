package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

    @Autowired
    private UsersDAO uDAO;





    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> body) {
        uDAO.idCheck(body.get("id"));
        System.out.println("a");
        System.out.println(body.get("id"));
        System.out.println(body.get("pw"));
        return "a";
    }
}
