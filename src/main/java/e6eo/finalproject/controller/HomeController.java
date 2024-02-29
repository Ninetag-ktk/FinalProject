package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import e6eo.finalproject.entity.UsersEntity;
import jakarta.json.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

    @Autowired
    private UsersDAO uDAO;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        System.out.println(req.get("id"));
        System.out.println(req.get("pw"));
        return uDAO.idCheck(req.get("id"), req.get("pw"));
    }
}
