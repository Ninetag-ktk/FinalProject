package e6eo.finalproject.dao;

import e6eo.finalproject.entity.NotesEntity;
import e6eo.finalproject.entity.UsersEntity;
import e6eo.finalproject.entityGoogle.googleLists;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotesDAO extends GoogleAPI {

    public void getGoogleNotes(String observe) {
        Optional<UsersEntity> user = usersMapper.findByObserveToken(observe);
        if (user.isEmpty()) {
            return;
        }
        String[] categories = categoryMapper.findById(user.get().getUserId()).get().getCategories().keySet().toArray(new String[0]);
        String accessToken = getNewAccessTokenByObserve(observe);
        Map<String, ArrayList<String>> categoryMap = decodeCategory(categories);
        noteCalendar(user.get().getUserId(), categoryMap.get("calendar"), accessToken);
        noteTasks(user.get().getUserId(), categoryMap.get("tasks"), accessToken);
        System.out.println("GetPostFromGoogle_Complete");
    }

    private void noteCalendar(String userId, ArrayList<String> list, String accessToken) {
        ArrayList<NotesEntity> posts = new ArrayList<>();
        WebClient webClient = WebClient.builder().codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(-1))
                .baseUrl("https://www.googleapis.com/calendar/v3/calendars/")
                .defaultHeaders(reqHeader(accessToken))
                .build();
        Map<String, String> dateTime = calcDateTime();
        String requestUrl = "/events?singleEvents=true"
                + "&timeMin=" + dateTime.get("start")
                + "&timeMax=" + dateTime.get("end")
                + "&timeZone=GMT+9&key=" + googleKey;
        for (String calendar : list) {
            Object json = webClient.get().uri(calendar + requestUrl)
                    .retrieve().bodyToMono(googleLists.class).block().getItems();
            for (Map<String, Object> event : (ArrayList<Map>) json) {
                NotesEntity post = new NotesEntity().eventParser(event, userId, calendar);
                posts.add(post);
            }
        }
        notesMapper.saveAll(posts);
    }

    private void noteTasks(String userId, ArrayList<String> list, String accessToken) {
        ArrayList<NotesEntity> posts = new ArrayList<>();
        WebClient webClient = WebClient.builder().codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(-1))
                .baseUrl("https://tasks.googleapis.com/tasks/v1/lists/")
                .defaultHeaders(reqHeader(accessToken))
                .build();
        Map<String, String> dateTime = calcDateTime();
        String requestUrl = "/tasks"
                + "?dueMax=" + dateTime.get("end")
                + "&dueMin=" + dateTime.get("start")
                + "&showCompleted=true&showHidden=true"
                + "&key" + googleKey;
        for (String tasklist : list) {
            Object json = webClient.get().uri(tasklist + requestUrl)
                    .retrieve().bodyToMono(googleLists.class).block().getItems();
            for (Map<String, Object> task : (ArrayList<Map>) json) {
                NotesEntity post = new NotesEntity().taskParser(task, userId, tasklist);
                posts.add(post);
            }
        }
        notesMapper.saveAll(posts);
    }

    public void noteWrite(Map<String, String> data) {
        String userId = usersMapper.findByObserveToken(data.get("observe")).get().getUserId();
        NotesEntity note = new NotesEntity().noteWriter(data);
        notesMapper.save(note);

    }

    public void gNoteDelete(){

    }

}
