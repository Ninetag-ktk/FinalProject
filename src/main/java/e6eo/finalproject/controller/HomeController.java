package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    private UsersDAO uDAO;





    @GetMapping("/main")
    public String login(@RequestParam(value = "id", defaultValue = "") String id, @RequestParam(name = "pw", defaultValue = "") String pw) {
        System.out.println("a");
        System.out.println(id);
        System.out.println(pw);
        return "a";
    }
}
