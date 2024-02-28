package e6eo.finalproject.dao;

import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.Value;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.people.v1.PeopleServiceScopes;
import com.google.api.services.tasks.TasksScopes;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoogleDAO {

    @Autowired
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    @Autowired
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    @Autowired
    private static final List<String> SCOPES =
            Arrays.asList(CalendarScopes.CALENDAR, PeopleServiceScopes.USERINFO_EMAIL, PeopleServiceScopes.USERINFO_PROFILE, TasksScopes.TASKS); // 푸시할 계획이므로 CALENDER만 사용
    @Autowired
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
    @Value("${google.appName")
    private String APPLICATION_NAME;

    public static String getAuthorization()
            throws Exception {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

        // Load client secrets.
        InputStream in = GoogleAPI.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
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

        String authorizationUrl = new AuthorizationCodeInstalledApp(flow, receiver).getReceiver().getRedirectUri();
        System.out.println(authorizationUrl);
        return authorizationUrl;
    }

//    public void googleGet() throws GeneralSecurityException, IOException {
//        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
//        PeopleService Pservice = // 피플 서비스(피플 api관련된거 가져옴)
//                new PeopleService.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
//                        .setApplicationName(APPLICATION_NAME)
//                        .build();
//
//        // People API
//        Person itsme = Pservice.people()
//                .get("people/me")
//                .setPersonFields("emailAddresses")
//                .execute();
//
//        System.out.println("결과 확인" + itsme.getEmailAddresses().get(0).getValue());
//
//    }


}
