package e6eo.finalproject.dao;

import e6eo.finalproject.dto.UsersMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenManager {

    @Autowired
    private final UsersMapper usersMapper;

    private String observeGenerator() {
        // 36글자의 랜덤한 객체 생성
        return UUID.randomUUID().toString();
    }

    public String setObserve(String userId) {
        String observe;
        do {
            // 랜덤값 생성
            observe = observeGenerator();
        } while (usersMapper.findByObserveToken(observe).isPresent());
        // 랜덤값을 가진 객체가 이미 있다면 반복
        // 랜덤값을 가진 객체가 없다면 DB에 저장
        usersMapper.updateObserveByUserId(userId, observe);
        // 랜덤값을 return하여 바로 set할 수 있도록 함
        return observe;
    }

    public void emptyObserve(String observe) {
        usersMapper.emptyObserve(observe);
    }
}