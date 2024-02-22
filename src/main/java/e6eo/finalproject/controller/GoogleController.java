package e6eo.finalproject.controller;

import e6eo.finalproject.dao.GoogleDAO;
import java.io.IOException;
import java.security.GeneralSecurityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/google")
public class GoogleController {

    @Autowired
    private GoogleDAO gDao;

    @GetMapping("/request")
    public String googleUser() throws GeneralSecurityException, IOException {
        gDao.googleGet();

        return null;
    }


}
