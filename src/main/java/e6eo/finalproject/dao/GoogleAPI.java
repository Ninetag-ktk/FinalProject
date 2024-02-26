package e6eo.finalproject.dao;

import e6eo.finalproject.entity.GoogleLoginResponse;
import e6eo.finalproject.entity.GoogleOAuthToken;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class GoogleAPI {
//  출처: https://ecolumbus.tistory.com/169 [슬기로운 개발자 생활:티스토리]
    @Value("${google.auth}")
    private String googleAuthUrl;
    @Value("${google.login}")
    private String googleLoginUrl;
    // redirect 경로를 여러개를 지정했을 때
    // @Value("${google.redirect}")
    // private List<String> googleRedirectUrlLs;
    @Value("${google.redirect}")
    private String googleRedirectUrl;
    @Value("${google.client.id}")
    private String googleClientId;
    @Value("${google.client.secret}")
    private String googleClientSecret;
    @Value("${google.scope}")
    private List<String> googleScopeLs;

//    리다이렉트 경로가 여러개일 경우 하나의 문자열로 변환하는 메서드
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

    // google 로그인 페이지로 이동 및 동의화면 출력하는 메서드
    // 해당 부분이 완료되면 {http://localhost:8080/google/check?code=**&scope=**} 형식으로 Response를 받음
    @PostConstruct
    public HttpHeaders getGoogleAuthUrl() throws Exception {
        // 요청 url 생성
        String AUTH_URL = googleAuthUrl;
        // 요청 url에 대한 파라미터 생성
        Map<String, Object> auth_params = new HashMap<>();
        auth_params.put("client_id",googleClientId);
        auth_params.put("redirect_uri", googleRedirectUrl);
        auth_params.put("response_type", "code");
        auth_params.put("scope", googleScope());
        auth_params.put("access_type", "offline");
        auth_params.put("prompt", "consent");
        // 요청 파라미터를 String으로 형변환
        String parameterString=auth_params.entrySet().stream()
                .map(x->x.getKey()+"="+x.getValue())
                .collect(Collectors.joining("&"));
        // 요청 url과 파라미터 결합
        String redirectURL = AUTH_URL + "?" + parameterString;
        
        // 로그 출력으로 확인
        log.info("reqUrl : \r\n{}", redirectURL);

        // HttpHeaders 를 사용해 바로 리다이렉션 할 수 있는 경로로 컨트롤러에 전달
        HttpHeaders redirectReq = new HttpHeaders();
        redirectReq.setLocation(URI.create(redirectURL));
        //1.redirectReq 구글로그인 창을 띄우고, 로그인 후 /login/check 으로 리다이렉션하게 한다.
        return redirectReq;
    }


    // 해당 메서드는 {http://localhost:8080/google/check} 경로에 대해서만 작동하도록 되어있음
    // 경로를 수정해야할 경우 요청할 것
    public GoogleOAuthToken getGoogleAuthCheck(@RequestParam(value = "code") String authCode) throws Exception {
// 출처 : https://dingdingmin-back-end-developer.tistory.com/entry/SpringBoot-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-Spring-Security-Oauth2-6-Google-Token-%ED%99%9C%EC%9A%A9
        // 토큰 생성 승인 코드가 받아와졌는지 확인
        // System.out.println(authCode);

        // 토큰 요청 경로
        String TOKEN_REQ = "https://oauth2.googleapis.com/token";
        // 토큰 요청에 필요한 내용을 HashMap에 담음
        Map<String, Object> token_params = new HashMap<>();
        token_params.put("client_id", googleClientId);
        token_params.put("client_secret", googleClientSecret);
        token_params.put("code", authCode);
        token_params.put("grant_type", "authorization_code");
        token_params.put("redirect_uri", googleRedirectUrl);

        RestTemplate restTemplate = new RestTemplate();

        //3.토큰요청을 한다.
        ResponseEntity<GoogleOAuthToken> apiResponse = restTemplate.postForEntity(TOKEN_REQ, token_params, GoogleOAuthToken.class);
        //4.받은 토큰을 토큰객체에 저장
        GoogleOAuthToken googleOAuthToken = apiResponse.getBody();

        // 토큰이 잘 받아와졌는지 확인
        log.info("accessTokenBody\r\n{}", googleOAuthToken);

        String googleToken = googleOAuthToken.getRefresh_token();

        //5.받은 토큰을 구글에 보내 유저정보를 얻는다.
        String requestUrl = UriComponentsBuilder.fromHttpUrl(googleAuthUrl + "/tokeninfo").queryParam("id_token", googleToken).toUriString();
//
//        //6.허가된 토큰의 유저정보를 결과로 받는다.
//        String resultJson = restTemplate.getForObject(requestUrl, String.class);
//        System.out.println(resultJson);
        return googleOAuthToken;
    }


}
