package e6eo.finalproject.dao;

import e6eo.finalproject.entity.UsersEntity;
import e6eo.finalproject.entityGoogle.googleUserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UsersDAO extends GoogleAPI {

    public String checkGoogleEmail() {
        googleUserInfo userInfo = getUserInfo();
        Optional<UsersEntity> users = usersMapper.findByInnerId(userInfo.getEmail());
        if (users.isEmpty()) {
            // 가입되지 않은 아이디라면
            // 자동 가입 처리
            doAutoSignUp(userInfo);
        } else {
            // 이미 가입되어있는 회원이라면
            // 리프레시토큰의 유효성 검사 및 업데이트 진행
            checkRefreshToken(users.get());
        }
        // 옵저브 토큰 설정 및 리턴
        return tokenManager.setObserve(userInfo.getEmail());
    }


    // 자동 가입 처리
    private void doAutoSignUp(googleUserInfo userInfo) {
        try {
            new UsersEntity();
            UsersEntity user = UsersEntity.builder().userId(userInfo.getEmail()).pw(usersToken.getAccess_token().substring(0, 19)).nickName(userInfo.getName()).innerId(userInfo.getEmail()).refreshToken(usersToken.getRefresh_token()).build();
            System.out.println(user.toString());
            usersMapper.save(user);
            categoryMapper.createDefaultCategory(user.getUserId(), user.getNickName());
            log.info("Google 계정 자동 가입 완료");
        } catch (Exception e) {
            e.printStackTrace();
            log.info("가입 실패");
        }
    }
    public ResponseEntity<?> login(String id, String pw) {
//        System.out.println("check");
        Map<String, String> result = new HashMap<>();
        Optional<UsersEntity> user = usersMapper.findById(id);
        if (user.isEmpty()) {
//            System.out.println("noId");
            result.put("code", "400");
            result.put("body", "가입되지 않은 아이디입니다");
            return ResponseEntity.badRequest().body(result);
        } else if (!pw.equals(user.get().getPw())) {
//            System.out.println("noPw");
            result.put("code", "400");
            result.put("body", "비밀번호가 일치하지 않습니다");
            return ResponseEntity.badRequest().body(result);
        } else {
//            System.out.println("ok");
            result.put("code", "200");
            result.put("body", tokenManager.setObserve(id));
            return ResponseEntity.ok(result);
        }
    }

    public void userJoin(@RequestBody UsersEntity users) {
        Optional<UsersEntity> user = usersMapper.findById(users.getUserId());
        if (user.isEmpty()) {
            usersMapper.save(users);
            System.out.println("성공");
        } else {
            System.out.println("실패!");
        }
    }

}