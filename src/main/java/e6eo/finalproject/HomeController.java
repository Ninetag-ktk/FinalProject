package e6eo.finalproject;

import e6eo.finalproject.service.GCalendar;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        String calendar = new GCalendar().getAppname();
        System.out.println(calendar);
        return "index";
    }
}
