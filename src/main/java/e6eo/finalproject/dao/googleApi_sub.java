package e6eo.finalproject.dao;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;
import com.google.api.services.calendar.model.CalendarList;
import com.google.api.services.calendar.model.CalendarListEntry;
import com.google.api.services.people.v1.PeopleService;
import com.google.api.services.people.v1.PeopleServiceScopes;
import com.google.api.services.people.v1.model.*;
import com.google.api.services.tasks.Tasks;
import com.google.api.services.tasks.model.*;
import com.google.api.services.tasks.*;


// ...



import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.List;

/* class to demonstrate use of Calendar events list API */
public class googleApi_sub {
    /**
     * Application name.
     */
    private static final String APPLICATION_NAME = "Google API Java Quickstart";
    /**
     * Global instance of the JSON factory.
     */
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    /**
     * Directory to store authorization tokens for this application.
     */
    private static final String TOKENS_DIRECTORY_PATH = "tokens"; // 토큰을 저장할 파일명 설정

    /**
     * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static final List<String> SCOPES =
            Arrays.asList(CalendarScopes.CALENDAR, PeopleServiceScopes.USERINFO_EMAIL, PeopleServiceScopes.USERINFO_PROFILE, TasksScopes.TASKS); // 푸시할 계획이므로 CALENDER만 사용
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    /**
     * Creates an authorized Credential object.
     *
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT)
            throws IOException {
        // Load client secrets.
        InputStream in = googleApi_sub.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
        //returns an authorized Credential object.
        return credential;
    }

    public static void main(String... args) throws IOException, GeneralSecurityException {
        // Build a new authorized API client service.
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        Calendar Cservice = // 캘린더 서비스(캘린더 api관련된거 가져옴)
                new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                        .setApplicationName(APPLICATION_NAME)
                        .build();
        PeopleService Pservice = // 피플 서비스(피플 api관련된거 가져옴)
                new PeopleService.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                        .setApplicationName(APPLICATION_NAME)
                        .build();
        Tasks Tservice = // 테스크 서비스(테스크 api관련된거 가져옴)
                new Tasks.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                        .setApplicationName(APPLICATION_NAME)
                        .build();
//
//        // List the next 10 events from the primary calendar.



        // Calender API뽑아내는 부분
        DateTime now = new DateTime(System.currentTimeMillis());
        String pageToken = null;

        do {
            CalendarList calendarList = Cservice.calendarList().list().setPageToken(pageToken).execute();
            // 캘린더 리스트를 받아오는 명령어 / pageToken은 명령어 제일 아래에 위치해서 다음 것들을 가져오도록 해놓은 것
            List<CalendarListEntry> items1 = calendarList.getItems();
            // 캘린더리스트들을 리스트형태의 CalendarListEntry로 변환시킨 것

            for (CalendarListEntry calendarListEntry : items1) {
                // 각 items안에 있는 캘린더리스트의 캘린더들을 하나씩 가져오는 것
                // Iterate through entries in calendar list
                System.out.println(calendarListEntry.getId()); // 캘린더 id들 정보
                Events events = Cservice.events().list(calendarListEntry.getId()) // 각 캘린더들의 id를 기준으로 뽑아옴
                        .setMaxResults(5) // 가져올 갯수
                        .setTimeMin(now) // 기준시간 설정(여기선 현재시간 즉, DateTime now = new DateTime(System.currentTimeMillis());)
                        .setOrderBy("startTime") // 시간순서대로 나열해달라는 의미
                        .setSingleEvents(true) // 반복으로 설정되어있지 않은 이벤트만 가져오기
                        .execute(); // 맺음
                List<Event> items = events.getItems(); // Events를 쪼개서 Event타입의 리스트에 넣음
                if (items.isEmpty()) {
                    System.out.println("No upcoming events found."); // 해당 캘린더에 이벤트가 없으면 뜨는 명령어
                } else {
                    System.out.println("Upcoming events"); // 이벤트가 있으면 뜨는 명령어
                    for (Event event : items) { // 각 이벤트를 하나씩 살펴보기
                        System.out.println(event.getSummary());             // 제목
                        System.out.println(event.getStart().getDateTime()); // 시작시간
                        System.out.println(event.getEnd().getDateTime());   // 종료시간
                        System.out.println(event.getEtag());                // etag
                        System.out.println(event.getDescription());         // 내용
                    }
                }
            }
            pageToken = calendarList.getNextPageToken();
        } while (pageToken != null);




        // Task API
        TaskLists tasklists = Tservice.tasklists().list().execute();

        List<TaskList> items = tasklists.getItems();

        String taskid = null;
        com.google.api.services.tasks.model.Tasks taskItem = null;
        for (TaskList tasklist : items) {
            taskid = tasklist.getId();
            taskItem = Tservice.tasks().list(taskid).execute();
            List<Task> item1 = taskItem.getItems();
            for (Task task : item1) { // 각 이벤트를 하나씩 살펴보기
                System.out.println(task.getTitle());
                System.out.println(task.getEtag());
                System.out.println(task.getNotes());
                System.out.println(task.getDue());
                    }
        }





        // People API
        Person itsme = Pservice.people()
                .get("people/me")
                .setPersonFields("emailAddresses")
                .execute();

        System.out.println("결과 확인" + itsme.getEmailAddresses().get(0).getValue());

    }


}
