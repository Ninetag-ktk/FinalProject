package e6eo.finalproject.controller;

import e6eo.finalproject.dao.CollectionsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lists")
public class CollectionsController {

    @Autowired
    private CollectionsDAO lDAO;

    @GetMapping("/test")
    public String test() {
        lDAO.saveCollection();
        return "테스트";
    }

    @GetMapping("/findtest")
    public String test1() {
        lDAO.findCollection();
        return "test";
    }
}
