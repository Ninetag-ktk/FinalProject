package e6eo.finalproject.dao;

import e6eo.finalproject.entity.UsersEntity;
import e6eo.finalproject.entityGoogle.googleLists;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryDAO extends GoogleAPI {

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
}
