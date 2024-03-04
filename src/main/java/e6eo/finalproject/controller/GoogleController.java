package e6eo.finalproject.controller;

import e6eo.finalproject.dao.GoogleAPI;
import e6eo.finalproject.dao.PostsDAO;
import e6eo.finalproject.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/google")
@CrossOrigin(origins = "http://localhost:3000")
public class GoogleController {

    @Autowired
    private GoogleAPI googleAPI;
    @Autowired
    private UsersDAO usersDAO;
    @Autowired
    private PostsDAO postsDAO;

    @GetMapping("/login")
    // 리액트에서 리다이렉트 될 수 있게끔, ResponseEntity<?> 에 URL을 String 타입으로 담아 반환
    public ResponseEntity<?> googleOAuth() throws Exception {
        Map<String, String> googleUrl = new HashMap<>();
        googleUrl.put("redirect", googleAPI.getGoogleAuthUrl());
        return ResponseEntity.ok(googleUrl);
    }

    @GetMapping("/check")
    public ResponseEntity<Void> googleCheck(@RequestParam(value = "code") String authCode) throws Exception {
        googleAPI.getGoogleToken(authCode);
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("http://localhost:3000/check?autologin=true&observe=" + usersDAO.checkGoogleEmail()))
                .build();
    }

    @ResponseBody
    @PostMapping("/test")
    public void googleTest(@RequestBody Map<String, String> data) {
        System.out.println(data.get("observe"));
        postsDAO.getGooglePosts(data.get("observe"));
    }
}
