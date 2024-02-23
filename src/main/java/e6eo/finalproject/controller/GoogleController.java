package e6eo.finalproject.controller;

import e6eo.finalproject.dao.GoogleDAO;
import java.io.IOException;
import java.security.GeneralSecurityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/google")
public class GoogleController {

    @Autowired
    private GoogleDAO gDao;

    @GetMapping("")
    public String aaa(){
        return "집가고싶다";
    }


    @GetMapping("/request")
    public String googleUser() {
        String re = null;
        try {
            re = gDao.getAuthorization();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return re;
    }


}
