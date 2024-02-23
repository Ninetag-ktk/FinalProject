package e6eo.finalproject.controller;

import e6eo.finalproject.entity.GoogleApiEntity;
import e6eo.finalproject.entity.GoogleLoginResponse;
import e6eo.finalproject.entity.GoogleOAuthRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j // 인터페이스로의 설정 및 로깅을 위한 어노테이션
@RestController
@RequestMapping("/googlelogin")
public class ApiGoogleController {
//    @Value("${google.auth.url}")
//    private static String googleAuthUrl;
//
//    @Value("${google.login.url}")
//    private static String googleLoginUrl;
//
//    @Value("${google.client.id}")
//    private static String googleClientId;
//
//    @Value("${google.redirect.url}")
//    private static String googleRedirectUrl;
//
//    @Value("${google.secret}")
//    private static String googleClientSecret;
//
//    @Value("${google.scope}")
//    private static String googleScope;


    @GetMapping("/getGoogleAuthUrl")
    public ResponseEntity<?> getGoogleAuthUrl(GoogleApiEntity g,  @Value("${google.auth.url}")
     String googleAuthUrl) throws Exception {

        String reqUrl = googleAuthUrl + "/o/oauth2/auth?client_id=" + g.getGoogleClientId() + "&redirect_uri=" + g.getGoogleRedirectUrl()
                + "&response_type=code" + "&scope=" + g.getGoogleScope() +
                "&access_type=offline";

        log.info("myLog-LoginUrl : {}",g.getGoogleLoginUrl());
        log.info("myLog-ClientId : {}",g.getGoogleClientId());
        log.info("myLog-RedirectUrl : {}",g.getGoogleRedirectUrl());

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(reqUrl));

        //1.reqUrl 구글로그인 창을 띄우고, 로그인 후 /login/oauth_google_check 으로 리다이렉션하게 한다.
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

//    @GetMapping(value = "/oauth_google_check")
//    public String oauth_google_check(@RequestParam(value = "code") String authCode) throws Exception{
//
//        //2.구글에 등록된 레드망고 설정정보를 보내어 약속된 토큰을 받위한 객체 생성
//        GoogleOAuthRequest googleOAuthRequest = GoogleOAuthRequest
//                .builder()
//                .clientId(googleClientId)
//                .clientSecret(googleClientSecret)
//                .code(authCode)
//                .redirectUri(googleRedirectUrl)
//                .grantType("authorization_code")
//                .build();
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        //3.토큰요청을 한다.
//        ResponseEntity<GoogleLoginResponse> apiResponse = restTemplate.postForEntity(googleAuthUrl + "/token", googleOAuthRequest, GoogleLoginResponse.class);
//        //4.받은 토큰을 토큰객체에 저장
//        GoogleLoginResponse googleLoginResponse = apiResponse.getBody();
//
//        log.info("responseBody {}",googleLoginResponse.toString());
//
//        String googleToken = googleLoginResponse.getId_token();
//
//        //5.받은 토큰을 구글에 보내 유저정보를 얻는다.
//        String requestUrl = UriComponentsBuilder.fromHttpUrl(googleAuthUrl + "/tokeninfo").queryParam("id_token",googleToken).toUriString();
//
//        //6.허가된 토큰의 유저정보를 결과로 받는다.
//        String resultJson = restTemplate.getForObject(requestUrl, String.class);
//
//        return resultJson;
//    }
}
