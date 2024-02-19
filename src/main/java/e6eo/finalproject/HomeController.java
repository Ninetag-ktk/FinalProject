package e6eo.finalproject;

import e6eo.finalproject.service.GCalendar;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "mainhome.html";
    }
}
