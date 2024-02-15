package e6eo.finalproject.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class GCalendar {
    private String appname;

    public GCalendar() {

    }
    public GCalendar(@Value("${google.appName}") String appName) {
        this.appname = appName;
    }


    public String getAppname() {
        return appname;
    }

}
