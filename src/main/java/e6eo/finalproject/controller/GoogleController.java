package e6eo.finalproject.controller;

import com.google.gson.JsonObject;
import e6eo.finalproject.dao.GoogleAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/google")
public class GoogleController {

    @Autowired
    private GoogleAPI googleAPI;

    @GetMapping("/login")
    public ResponseEntity<?> googleOAuth() throws Exception {
        return new ResponseEntity<>(googleAPI.getGoogleAuthUrl(), HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping("/check")
    public String googleCheck(@RequestParam(value = "code") String authCode) throws Exception {
        googleAPI.getGoogleToken(authCode);
        String result = googleAPI.checkGoogleEmail();
        return result;
    }

    @GetMapping("/test")
    public JsonObject googleTest() {
        return googleAPI.getCalendarList();
    }


}
