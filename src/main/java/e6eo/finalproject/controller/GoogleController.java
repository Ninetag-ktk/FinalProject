package e6eo.finalproject.controller;

import e6eo.finalproject.dao.*;
import e6eo.finalproject.dto.CategoryMapper;
import e6eo.finalproject.dto.NotesMapper;
import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.format.DateTimeFormatter;
import java.util.Date;
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
    private CategoryDAO categoryDAO;
    @Autowired
    private NotesDAO notesDAO;
    @Autowired
    private UsersMapper usersMapper;
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private NotesMapper notesMapper;

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
                .location(URI.create("http://localhost:3000/check?autologin=true&observe=" + googleAPI.checkGoogleEmail()))
                .build();
    }

    @PostMapping("/updateCheck")
    public void checkGoogleAccount(@RequestBody Map<String, String> req) {
        System.out.println("구글 데이터 업데이트");
        UsersEntity user = usersMapper.findByObserveToken(req.get("observe")).get();
        String accessToken = googleAPI.getNewAccessTokenByObserve(req.get("observe"));
        if (!user.getInnerId().isEmpty()) {
            if (categoryDAO.checkGoogleCategory(user, accessToken)) {
                // 구글 데이터를 받아온 적이 없는 경우
                // 데이터를 요청해서 받아옴
                notesDAO.getGoogleNotes(user, accessToken);
            } else {
                notesDAO.checkGoogleNotes(user, accessToken);
            }
        }
    }

    @PostMapping("/updateMonthly")
    public void updateMonthly(@RequestBody Map<String, String> req) {
        UsersEntity user = usersMapper.findByObserveToken(req.get("observe")).get();
        if (!user.getInnerId().isEmpty()) {
            notesDAO.checkGoogleNotes(req.get("observe"), req.get("token"), req.get("date"));
        }
    }

    @PostMapping("/reqAccessToken")
    public ResponseEntity<?> getAccessToken(@RequestBody Map<String, String> req) {
        Map<String, String> accessToken = new HashMap<>();
        UsersEntity user = usersMapper.findByObserveToken(req.get("observe")).get();
        if (!user.getInnerId().isEmpty()) {
            accessToken.put("access", googleAPI.getNewAccessTokenByObserve(req.get("observe")));
        } else {
            accessToken.put("access", "0");
        }
        return ResponseEntity.ok(accessToken);
    }

    @ResponseBody
    @PostMapping("/test")
    public void googleTest(@RequestBody Map<String, String> data) {
        System.out.println(data.get("observe"));
        notesDAO.getGoogleNotes(data.get("observe"));
    }
}
