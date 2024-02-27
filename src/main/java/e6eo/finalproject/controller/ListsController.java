package e6eo.finalproject.controller;

import e6eo.finalproject.dao.ListsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lists")
public class ListsController {

    @Autowired
    private ListsDAO lDAO;

    @GetMapping("/test")
    public String test() {
        lDAO.saveList();
        return "테스트";
    }
}
