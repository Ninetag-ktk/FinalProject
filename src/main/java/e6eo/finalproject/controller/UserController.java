package e6eo.finalproject.controller;

import e6eo.finalproject.dao.UsersDAO;
import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UsersDAO usersDao;

    @Autowired
    private UsersMapper usersMapper;

    @DeleteMapping("/google")
    public ResponseEntity<?> disconnectGoogle(@RequestBody String observe) {
        usersMapper.emptyInnerId(observe.replace("\"",""));
        return ResponseEntity.ok(true);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
//        System.out.println(req.get("id"));
//        System.out.println(req.get("pw"));
        return usersDao.login(req.get("id"), req.get("pw"));
    }

    @PostMapping("/join")
    public ResponseEntity<?> userJoin(@RequestBody UsersEntity users) {
        System.out.println(users);
        return usersDao.userJoin(users);
    }

    @PostMapping("/checkToken")
    public ResponseEntity<?> checkObserve(@RequestBody String observe) {
        System.out.println(observe);
        Optional<UsersEntity> user = usersMapper.findByObserveToken(observe.replace("\"", ""));
        return !(user.isEmpty()) ? ResponseEntity.ok(true) : ResponseEntity.ok(false);
    }

    @PostMapping("/update")
    public ResponseEntity<?> patchUserData(@RequestBody String observe) {
        Optional<UsersEntity> users = usersMapper.findByObserveToken(observe.replace("\"", ""));
        if (!(users == null)) {
            return ResponseEntity.ok(users.get());
        } else {
            return ResponseEntity.ok(null);
        }
    }

}



