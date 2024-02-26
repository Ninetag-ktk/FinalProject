package e6eo.finalproject.controller;

import e6eo.finalproject.dao.GoogleAPI;
import e6eo.finalproject.dao.GoogleDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/google")
public class GoogleController {

    @Autowired
    private GoogleAPI googleAPI;

    @Autowired
    private GoogleDAO gDao;

    @GetMapping("/login")
    public ResponseEntity<?> googleOAuth() throws Exception {
        return new ResponseEntity<>(googleAPI.getGoogleAuthUrl(), HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping("/check")
    public String googleCheck(@RequestParam(value = "code") String authCode) throws Exception {
        String result = googleAPI.getGoogleAuthCheck(authCode).getRefresh_token();
        return result;
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
