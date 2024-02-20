package e6eo.finalproject.dao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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
