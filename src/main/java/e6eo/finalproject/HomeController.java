package e6eo.finalproject;

import e6eo.finalproject.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private UsersDAO uDAO;
    @GetMapping("/")
    public String mainPage() {
        uDAO.signup();
        return null;
    }
}
