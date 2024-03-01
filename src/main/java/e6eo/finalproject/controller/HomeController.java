package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @Autowired
    private UsersDAO uDAO;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
//        System.out.println(req.get("id"));
//        System.out.println(req.get("pw"));
        return uDAO.login(req.get("id"), req.get("pw"));
    }
}
