package e6eo.finalproject.controller;

import e6eo.finalproject.dao.NotesDAO;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notes")
public class NotesController {

    @Autowired
    private NotesDAO nDAO;

    @PostMapping("/write")
    public void write(@RequestBody Map<String, String> data) {
        nDAO.noteWrite(data);

    }

    @PostMapping("/ymdata")
    public void ymData(@RequestBody Map<String, String> data) {
        System.out.println(data.get("month") +"/" + data.get("year") + "/" + data.get("observe"));

    }


}
