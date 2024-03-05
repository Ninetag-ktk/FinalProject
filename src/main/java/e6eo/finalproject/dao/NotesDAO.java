package e6eo.finalproject.dao;

import e6eo.finalproject.entity.NotesEntity;
import e6eo.finalproject.entity.UsersEntity;
import e6eo.finalproject.entityGoogle.googleLists;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotesDAO extends GoogleAPI {

    public void checkGoogleNotes(UsersEntity user, String accessToken) {
        List<NotesEntity> notes = notesMapper.findByUserId(user.getUserId());
        Map<Object, Object> notesEtag = notes.stream().collect(Collectors.toMap(NotesEntity::getId, NotesEntity::getEtag));
        Map<String, ArrayList<String>> categories = decodeCategory(
                categoryMapper.findById(user.getUserId()).get().getCategories().keySet().toArray(new String[0]));
        noteCalendar(user.getUserId(), categories.get("calendar"), accessToken);
        noteTasks(user.getUserId(), categories.get("tasks"), accessToken);
    }

    private void scanCalendarNotes(Map<Object, Object> notesEtag, ArrayList<NotesEntity> noteCalendar) {
        for (NotesEntity note : noteCalendar) {
            if (!note.getEtag().equals(notesEtag.get(note.getId()))) {

            }
        }
    }

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

    public void getGoogleNotes(UsersEntity user, String accessToken) {
        String[] categories = categoryMapper.findById(user.getUserId()).get().getCategories().keySet().toArray(new String[0]);
        Map<String, ArrayList<String>> categoryMap = decodeCategory(categories);
        notesMapper.saveAll(noteCalendar(user.getUserId(), categoryMap.get("calendar"), accessToken));
        notesMapper.saveAll(noteTasks(user.getUserId(), categoryMap.get("tasks"), accessToken));
        System.out.println("GetPostFromGoogle_Complete");
    }

    private ArrayList<NotesEntity> noteCalendar(String userId, ArrayList<String> list, String accessToken) {
        ArrayList<NotesEntity> notes = new ArrayList<>();
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
                notes.add(post);
            }
        }
        return notes;
    }

    private ArrayList<NotesEntity> noteTasks(String userId, ArrayList<String> list, String accessToken) {
        ArrayList<NotesEntity> notes = new ArrayList<>();
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
                notes.add(post);
            }
        }
       return notes;
    }
}
