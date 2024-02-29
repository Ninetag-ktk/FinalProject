package e6eo.finalproject.dao;

import com.fasterxml.jackson.databind.ObjectMapper;
import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.UsersEntity;
import jakarta.json.Json;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletWebRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UsersDAO {


    @Autowired
    private final UsersMapper usersMapper;
    @Autowired
    private TokenManager tokenManager;
    private UsersEntity usersEntity;


    public void userJoin(@RequestBody UsersEntity users) {
        Optional<UsersEntity> user = usersMapper.findById(users.getUserId());
        if (user.isEmpty()) {
            usersMapper.save(users);
            System.out.println("성공");
        } else {
            System.out.println("실패!");
        }
    }

    public ResponseEntity<?> login(String id, String pw) {
        System.out.println("check");
        Map<String, String> result = new HashMap<>();
        Optional<UsersEntity> user = usersMapper.findById(id);
        if (user.isEmpty()) {
            System.out.println("noId");
            result.put("code", "400");
            result.put("body", "가입되지 않은 아이디입니다");
            return ResponseEntity.badRequest().body(result);
        } else if (!pw.equals(user.get().getPw())) {
            System.out.println("noPw");
            result.put("code", "400");
            result.put("body", "비밀번호가 일치하지 않습니다");
            return ResponseEntity.badRequest().body(result);
        } else {
            System.out.println("ok");
            result.put("code", "200");
            result.put("body", tokenManager.setObserve(id));
            return ResponseEntity.ok(result);
        }
    }

    public void findAll() {
        List<UsersEntity> users = usersMapper.findAll();
        for (UsersEntity user : users) {
            System.out.println(user);
        }
    }
}