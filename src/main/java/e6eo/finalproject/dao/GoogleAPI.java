package e6eo.finalproject.dao;

import com.google.api.client.util.DateTime;
import e6eo.finalproject.dto.CategoryMapper;
import e6eo.finalproject.dto.PostsMapper;
import e6eo.finalproject.dto.UsersMapper;
import e6eo.finalproject.entity.PostsEntity;
import e6eo.finalproject.entity.UsersEntity;
import e6eo.finalproject.entityGoogle.GoogleToken;
import e6eo.finalproject.entityGoogle.googleEvent;
import e6eo.finalproject.entityGoogle.googleLists;
import e6eo.finalproject.entityGoogle.googleUserInfo;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleAPI {
    @Autowired
    private final UsersMapper usersMapper;
    @Autowired
    private final CategoryMapper categoryMapper;
    @Autowired
    private final PostsMapper postsMapper;
    @Autowired
    private final TokenManager tokenManager;
    //  출처: https://ecolumbus.tistory.com/169 [슬기로운 개발자 생활:티스토리]
    @Value("${google.auth}")
    private String googleAuthUrl;
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
            header.add("Authorization", "Bearer " + accessToken);
            header.add("Accept", "application/json");
        };
        return headers;
    }

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

    // 리프레시 토큰의 유효성 검사 및 업데이트 메서드
    private void checkRefreshToken(UsersEntity users) {
        if (!usersToken.getRefresh_token().isEmpty() && !users.getRefreshToken().equals(usersToken.getRefresh_token())) {
            usersMapper.updateRefreshToken(users.getUserId(), usersToken.getRefresh_token());
        }
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
        googleUserInfo userInfo = webClient.get().uri(userInfoUrl).headers(headers).retrieve().bodyToMono(googleUserInfo.class).block();
        log.info(userInfo.toString());
        return userInfo;
    }

    // google 로그인 페이지로 이동 및 동의화면 출력하는 메서드
    // 해당 부분이 완료되면 {http://localhost:8080/google/check?code=**&scope=**} 형식으로 Response를 받음
    @PostConstruct
    public String getGoogleAuthUrl() throws Exception {
        // 요청 url 생성
        String AUTH_URL = googleAuthUrl;
        // 요청 url에 대한 파라미터 생성
        Map<String, Object> auth_params = new HashMap<>();
        auth_params.put("client_id", googleClientId);
        auth_params.put("redirect_uri", googleRedirectUrl);
        auth_params.put("response_type", "code");
        auth_params.put("scope", googleScope());
        auth_params.put("access_type", "offline");
        auth_params.put("prompt", "consent");
        // 요청 파라미터를 String으로 형변환
        String parameterString = auth_params.entrySet().stream().map(x -> x.getKey() + "=" + x.getValue()).collect(Collectors.joining("&"));
        // 요청 url과 파라미터 결합
        String redirectURL = AUTH_URL + "?" + parameterString;

        // 로그 출력으로 확인
        log.info("reqUrl : \r\n{}", redirectURL);

        // HttpHeaders 를 사용해 바로 리다이렉션 할 수 있는 경로로 컨트롤러에 전달
//        HttpHeaders redirectReq = new HttpHeaders();
//        redirectReq.setLocation(URI.create(redirectURL));
        //1.redirectReq 구글로그인 창을 띄우고, 로그인 후 /login/check 으로 리다이렉션하게 한다.
        return redirectURL;
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

    // 클라이언트로부터 Google API 요청이 들어왔을 경우
    // 파라미터로 받은 옵저브 토큰으로, 해당 유저의 리프레시 토큰을 받아옴
    // 리프레시 토큰으로 새로운 엑세스 토큰을 발급받아 요청을 진행
    public String getNewAccessTokenByObserve(String observeToken) {
        String TOKEN_REQ = "https://oauth2.googleapis.com/token";
        Map<String, Object> token_params = new HashMap<>();
        token_params.put("client_id", googleClientId);
        token_params.put("client_secret", googleClientSecret);
        // 세션에 있는 User의 데이터의 ID를 사용해서 refresh_token 데이터를 받아오고
        token_params.put("refresh_token", usersMapper.getRefreshTokenByObserve(observeToken));
        token_params.put("grant_type", "refresh_token");
        RestTemplate restTemplate = new RestTemplate();
        // 새로운 토큰을 요청
        ResponseEntity<GoogleToken> apiResponse = restTemplate.postForEntity(TOKEN_REQ, token_params, GoogleToken.class);
        GoogleToken token = apiResponse.getBody();
        log.info("accessToken\r\n{}", token.getAccess_token());
        // 엑세스 토큰만 리턴하여 바로 사용할 수 있게끔 함
        return token.getAccess_token();
    }

    // API 데이터 요청 파트

    private Map<String, String> listCalendar(String accessToken) {
        WebClient webClient = WebClient.create();
        String Url = "https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=100&key=" + googleKey;
        Object json = webClient.get().uri(Url).headers(reqHeader(accessToken)).retrieve().bodyToMono(googleLists.class).block().getItems();
        Map<String, String> category = new HashMap<>();
//        System.out.println(json);
        for (Map item : (ArrayList<Map>) json) {
            if (item.get("id").equals("ko.south_korea#holiday@group.v.calendar.google.com")) {
                continue;
            } else if (item.get("id").equals(item.get("summary"))) {
                category.put("google^calendar^" + item.get("id").toString().replace(".", "_"), "내 구글 캘린더");
            } else {
                category.put("google^calendar^" + item.get("id").toString().replace(".", "_"), item.get("summary").toString());
            }
        }
        return category;
    }

    private Map<String, String> listTasks(String accessToken) {
        WebClient webClient = WebClient.create();
        String Url = "https://tasks.googleapis.com/tasks/v1/users/@me/lists?maxResults=100&key=" + googleKey;
        Object json = webClient.get().uri(Url).headers(reqHeader(accessToken)).retrieve().bodyToMono(googleLists.class).block().getItems();
        Map<String, String> category = new HashMap<>();
//        System.out.println(json);
        for (Map item : (ArrayList<Map>) json) {
            category.put("google^tasks^" + item.get("id").toString().replace(".", "_"), item.get("title").toString());
        }
        return category;
    }

    public Map<String, String> getGoogleCategory(String observe) {
        Optional<UsersEntity> user = usersMapper.findByObserveToken(observe);
        Map<String, String> categories = new HashMap<>();
        if (user.isEmpty()) {
            categories.put("error", "NoAuthorizedAccess");
            return categories;
        }
        String accessToken = getNewAccessTokenByObserve(observe);
        categories.putAll(listCalendar(accessToken));
        categories.putAll(listTasks(accessToken));
        for (String key : categories.keySet()) {
            categoryMapper.addCategory(user.get().getUserId(), key, categories.get(key));
//            System.out.println(key + "  :  " + category.get(key));
        }
        return categories;
    }

    public void getGooglePosts(String observe) {
        Optional<UsersEntity> user = usersMapper.findByObserveToken(observe);
        if (user.isEmpty()) {
            return;
        }
        String[] categories = categoryMapper.findById(user.get().getUserId()).get().getCategories().keySet().toArray(new String[0]);
        String accessToken = getNewAccessTokenByObserve(observe);
        Map<String, ArrayList<String>> categoryMap = convertList(categories);
        postCalendar(user.get().getUserId(), categoryMap.get("calendar"), accessToken);
    }

    private Map<String, ArrayList<String>> convertList(String[] categoryList) {
        Map<String, ArrayList<String>> result = new HashMap<>();
        ArrayList<String> calendarLists = new ArrayList<>();
        ArrayList<String> taskLists = new ArrayList<>();

        for (String category : categoryList) {
//            System.out.println(category);
            String[] index = category.replace("_", ".").split("\\^");
            if (index[0].equals("google")) {
                if (index[1].equals("calendar")) {
                    calendarLists.add(index[2]);
                } else if (index[1].equals("tasks")) {
                    taskLists.add(index[2]);
                }
            }
        }
        result.put("calendar", calendarLists);
        result.put("task", taskLists);
//        System.out.println("캘린더");
//        for (String calendar : calendarLists) {
//            System.out.println(calendar);
//        }
//        System.out.println("태스크");
//        for (String task : taskLists) {
//            System.out.println(task);
//        }
        return result;
    }

    private void postCalendar(String userId, ArrayList<String> list, String accessToken) {
        ArrayList<PostsEntity> posts = new ArrayList<>();
        WebClient webClient = WebClient.builder().codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(-1)).build();
        Map<String, String> dateTime = calcDateTime();
        String StartUrl = "https://www.googleapis.com/calendar/v3/calendars/";
        String EndUrl = "/events?";
        for (String calendar : list) {
            Object json = webClient.get()
                    .uri(StartUrl + calendar + EndUrl)
//                    .attribute("timeMax", dateTime.get("end"))
                    .attribute("timeMin", dateTime.get("start"))
                    .attribute("key", googleKey)
                    .headers(reqHeader(accessToken))
                    .retrieve()
                    .bodyToMono(googleLists.class)
                    .block().getItems();
            for (Map<String, Object> event : (ArrayList<Map>) json) {
                PostsEntity post = PostsEntity.builder()
                        .id(event.get("id"))
                        .categoryId(userId + "^google^calendar^" + calendar)
                        .status(event.get("status"))
                        .startTime(event.get("Start"))
                        .endTime(event.get("end"))
                        .title(event.get("summary"))
                        .contents(event.get("description"))
                        .build();
                posts.add(post);
            }
        }
        for (PostsEntity post : posts) {
            System.out.println(post.getTitle());

        }
    }

    private Map<String, String> calcDateTime() {
        Map<String, String> dateTime = new HashMap<>();
        String timeZone = ":00+09:00";
        // 데이터가 조회되는 현재(now)의 월 첫날로 세팅하고(withDayofMonth(1)), 하루를 빼(minusDays(1)) 전 월의 마지막일 설정
        String startTimeStamp = LocalDate.now().withDayOfMonth(1).minusDays(1).atStartOfDay().toString() + timeZone;
//        System.out.println("스타트타임" + startTimeStamp);
        // 데이터가 조회되는 현재(now)의 월 첫날로 세팅하고(withDayofMonth(1)), 한달을 더해(plusMonths(1)) 전 월의 마지막일 설정
        String endTimeStamp = LocalDate.now().withDayOfMonth(1).plusMonths(1).atStartOfDay().toString() + timeZone;
//        System.out.println("엔드타임" + endTimeStamp);
        dateTime.put("start", startTimeStamp);
        dateTime.put("end", endTimeStamp);
        System.out.println(dateTime.get("start"));
        System.out.println(dateTime.get("end"));
        return dateTime;
    }
}
