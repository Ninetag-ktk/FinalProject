package e6eo.finalproject.controller;

import e6eo.finalproject.entity.GoogleLoginResponse;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


//  출처: https://ecolumbus.tistory.com/169 [슬기로운 개발자 생활:티스토리]

@Slf4j // 인터페이스로의 설정 및 로깅을 위한 어노테이션
@RestController
@RequestMapping("/google/login")
public class ApiGoogleController {
    @Value("${google.auth}")
    private String googleAuthUrl;
    @Value("${google.login}")
    private String googleLoginUrl;
    //     redirect 경로를 여러개를 지정했을 때
//    @Value("${google.redirect}")
//    private List<String> googleRedirectUrlLs;
    @Value("${google.redirect}")
    private String googleRedirectUrl;
    @Value("${google.client.id}")
    private String googleClientId;
    @Value("${google.client.secret}")
    private String googleClientSecret;
    @Value("${google.scope}")
    private List<String> googleScopeLs;

    // 리다이렉트 경로가 여러개일 경우 하나의 문자열로 변환하는 메서드
//    private String googleRedirectUrl() {
//        StringBuilder redirect = new StringBuilder();
//        for (int i=0; i < googleRedirectUrlLs.size(); i++ ) {
//            redirect.append(googleRedirectUrlLs.get(i));
//            if (i < googleRedirectUrlLs.size()-1) {
//                redirect.append("%20");
//            }
//        }
//        return redirect.toString();
//    }

    private String googleScope() {
        StringBuilder scope = new StringBuilder();
        for (int i = 0; i < googleScopeLs.size(); i++) {
            scope.append(googleScopeLs.get(i));
            if (i < googleScopeLs.size() - 1) {
                scope.append("%20");
            }
        }
        return scope.toString();
    }

    @PostConstruct
    @GetMapping("/")
    public ResponseEntity<?> getGoogleAuthUrl() throws Exception {

        String reqUrl = googleAuthUrl + "?client_id=" + googleClientId + "&redirect_uri=" + googleRedirectUrl
                + "&response_type=code" + "&scope=" + googleScope() +
                "&access_type=offline&prompt=consent";

//        log.info("myLog-LoginUrl : {}",googleLoginUrl);
//        log.info("myLog-ClientId : {}",googleClientId);
//        log.info("myLog-RedirectUrl : {}",googleRedirectUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(reqUrl));
        log.info("reqUrl : \r\n{}", reqUrl);

        //1.reqUrl 구글로그인 창을 띄우고, 로그인 후 /login/oauth_google_check 으로 리다이렉션하게 한다.
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping(value = "/check")
    public String oauth_google_check(@RequestParam(value = "code") String authCode) throws Exception {
        // 출처 : https://dingdingmin-back-end-developer.tistory.com/entry/SpringBoot-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-Spring-Security-Oauth2-6-Google-Token-%ED%99%9C%EC%9A%A9
        // 토큰 생성 승인 코드가 받아와졌는지 확인
        // System.out.println(authCode);

        // 토큰 요청 경로
        String TOKEN_REQ = "https://oauth2.googleapis.com/token";
        // 토큰 요청에 필요한 내용을 HashMap에 담음
        Map<String, Object> token_params = new HashMap<>();
        token_params.put("code", authCode);
        token_params.put("client_id", googleClientId);
        token_params.put("client_secret", googleClientSecret);
        token_params.put("redirect_uri", googleRedirectUrl);
        token_params.put("grant_type", "authorization_code");

        RestTemplate restTemplate = new RestTemplate();

        //3.토큰요청을 한다.
        ResponseEntity<GoogleLoginResponse> apiResponse = restTemplate.postForEntity(TOKEN_REQ, token_params, GoogleLoginResponse.class);
        //4.받은 토큰을 토큰객체에 저장
        GoogleLoginResponse googleLoginResponse = apiResponse.getBody();

        // 토큰이 잘 받아와졌는지 확인
        // log.info("responseBody {}", googleLoginResponse.toString());

        String googleToken = googleLoginResponse.getId_token();
//
//        //5.받은 토큰을 구글에 보내 유저정보를 얻는다.
//        String requestUrl = UriComponentsBuilder.fromHttpUrl(googleAuthUrl + "/tokeninfo").queryParam("id_token", googleToken).toUriString();
//
//        //6.허가된 토큰의 유저정보를 결과로 받는다.
//        String resultJson = restTemplate.getForObject(requestUrl, String.class);
//        System.out.println(resultJson);
        return apiResponse.toString();
    }
}
