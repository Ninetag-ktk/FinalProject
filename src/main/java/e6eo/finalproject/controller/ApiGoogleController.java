package e6eo.finalproject.controller;

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
@RequestMapping("/google/login")
public class ApiGoogleController {
    @Value("${google.auth}")
    private String googleAuth;
    @Value("${google.login}")
    private String googleLogin;
    @Value("${google.client.id}")
    private String googleClientId;
    @Value("${google.client.googleClientSecret}")
    private String googleClientSecret;
    @Value("${google.redirect}")
    private String googleRedirectUrl;
    @Value("${google.scope}")
    private String[] googleScope;

    @GetMapping("/getGoogleAuthUrl")
    public ResponseEntity<?> getGoogleAuthUrl() throws Exception {

        StringBuilder scope = null;
        for (int i = 0; i < googleScope.length; i++) {
            if (i == googleScope.length-1) {
                scope.append(googleScope[i]);
            }
            scope.append(googleScope[i]).append("20%");
        }

        String reqUrl = googleLogin + "/o/oauth2/auth?client_id=" + googleClientId + "&redirect_uri=" + googleRedirectUrl
                + "&response_type=code" + "&scope=" + scope +
                "&access_type=offline";

        log.info("myLog-LoginUrl : {}",googleLogin);
        log.info("myLog-ClientId : {}",googleClientId);
        log.info("myLog-RedirectUrl : {}",googleRedirectUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(reqUrl));

        //1.reqUrl 구글로그인 창을 띄우고, 로그인 후 /login/oauth_google_check 으로 리다이렉션하게 한다.
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping(value = "/oauth_google_check")
    public String oauth_google_check(@RequestParam(value = "code") String authCode) throws Exception{

        //2.구글에 등록된 레드망고 설정정보를 보내어 약속된 토큰을 받위한 객체 생성
        GoogleOAuthRequest googleOAuthRequest = GoogleOAuthRequest
                .builder()
                .clientId(googleClientId)
                .clientSecret(googleClientSecret)
                .code(authCode)
                .redirectUri(googleRedirectUrl)
                .grantType("authorization_code")
                .build();

        RestTemplate restTemplate = new RestTemplate();

        //3.토큰요청을 한다.
        ResponseEntity<GoogleLoginResponse> apiResponse = restTemplate.postForEntity(googleAuth + "/token", googleOAuthRequest, GoogleLoginResponse.class);
        //4.받은 토큰을 토큰객체에 저장
        GoogleLoginResponse googleLoginResponse = apiResponse.getBody();

        log.info("responseBody {}",googleLoginResponse.toString());

        String googleToken = googleLoginResponse.getId_token();

        //5.받은 토큰을 구글에 보내 유저정보를 얻는다.
        String requestUrl = UriComponentsBuilder.fromHttpUrl(googleAuth + "/tokeninfo").queryParam("id_token",googleToken).toUriString();

        //6.허가된 토큰의 유저정보를 결과로 받는다.
        String resultJson = restTemplate.getForObject(requestUrl, String.class);

        return resultJson;
    }
}