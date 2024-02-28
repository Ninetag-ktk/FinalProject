package e6eo.finalproject.dao;

import com.google.gson.JsonObject;
import e6eo.finalproject.dto.CategoryMapper;
import e6eo.finalproject.dto.PostsMapper;
import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.UsersEntity;
import e6eo.finalproject.entityGoogle.GoogleToken;
import e6eo.finalproject.entityGoogle.googleUserInfo;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
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
    @Value("${google.key}")
    private String googleKey;

    private GoogleToken usersToken = null;

    // API 요청에 사용되는 기본적인 헤더
    private Consumer<HttpHeaders> reqHeader(String accessToken) {
        Consumer<HttpHeaders> headers = header -> {
            header.add("Authorization", "Bearer "+ accessToken);
            header.add("Accept", "application/json");
        };
        return headers;
    }

    @Autowired
    private final UsersMapper usersMapper;
    @Autowired
    private final CategoryMapper categoryMapper;
    @Autowired
    private final PostsMapper postsMapper;

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

    /////////////////////////////////////////
    // 작동 메서드

    // 구글 계정으로 가입된 아이디가 있는지 확인
    public String checkGoogleEmail() {
        googleUserInfo userInfo = getUserInfo();
        List<UsersEntity> users = usersMapper.findByInnerId(userInfo.getEmail());
        if (users.isEmpty()) {
            return doAutoSignUp(userInfo);
        } else {
            return "이미 가입된 계정";
        }
    }

    // 자동 가입 처리
    private String doAutoSignUp(googleUserInfo userInfo) {
        try {
            UsersEntity user = new UsersEntity().builder()
                    .userId(userInfo.getEmail())
                    .pw(usersToken.getAccess_token().substring(0,19))
                    .nickName(userInfo.getName())
                    .innerId(userInfo.getEmail())
                    .refreshToken(usersToken.getRefresh_token())
                    .build();
            System.out.println(user.toString());
            usersMapper.save(user);
            return "Google 계정 자동 가입 완료";
        } catch (Exception e){
            e.printStackTrace();
            return "가입 실패";
        }
    }

    // 구글 계정에서 userInfo 데이터 가져옴
    private googleUserInfo getUserInfo() {
        WebClient webClient = WebClient.create();
        String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
        String token = usersToken.getAccess_token();

        // 다른 API의 요청 헤더와 요소가 달라 별도로 생성함
        Consumer<HttpHeaders> headers = httpHeaders -> {
            httpHeaders.add("Authorization", "Bearer " + token);
        };

        // 토큰을 userInfo API로 보내 유저 정보를 가져옴
        googleUserInfo userInfo = webClient.get()
                .uri(userInfoUrl)
                .headers(headers)
                .retrieve()
                .bodyToMono(googleUserInfo.class)
                .block();
        log.info(userInfo.toString());
        return userInfo;
    }

    public JsonObject getCalendarList() {
        WebClient webClient = WebClient.create();
        String calendarListUrl = "https://www.googleapis.com/calendar/v3/users/me/calendarList&key="+googleKey;
        String token = usersToken.getAccess_token();
        JsonObject calendarListJson = webClient.get()
                .uri(calendarListUrl)
                .headers(reqHeader(token))
                .retrieve()
                .bodyToMono(JsonObject.class)
                .block();
        return calendarListJson;
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
    public GoogleToken getGoogleToken(@RequestParam(value = "code") String authCode) throws Exception {
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
        ResponseEntity<GoogleToken> apiResponse = restTemplate.postForEntity(TOKEN_REQ, token_params, GoogleToken.class);
        //4.받은 토큰을 토큰객체에 저장
        GoogleToken googleToken = apiResponse.getBody();

        // 토큰이 잘 받아와졌는지 확인
        log.info("accessTokenBody\r\n{}", googleToken);
        usersToken = googleToken;
        return googleToken;
    }

//    public GoogleToken getNewAccessToken() {
//        세션에 있는 User의 데이터의 ID를 사용해서 refresh_token 데이터를 받아오고
//        String TOKEN_REQ = "https://oauth2.googleapis.com/token"
//        Map<String, Object> token_params = new HashMap<>();
//        token_params.put("client_id", googleClientId);
//        token_params.put("client_secret", googleClientSecret);
//        token_params.put("refresh_token", users.getRefreshToken());
//        token_params.put("grant_type", "refresh_token");
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<GoogleToken> apiResponse = restTemplate.postForEntity(TOKEN_REQ, token_params, GoogleToken.class);
//        GoogleToken googleToken = apiResponse.getBody();
//        log.info("accessToken\r\n{}", googleToken.getAccessToken());
//        return googleToken;
//    }
}
