package e6eo.finalproject.controller;

import e6eo.finalproject.dao.CategoryDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lists")
public class CategoryController {

    @Autowired
    private CategoryDAO cDAO;

    @GetMapping("/test")
    public String test() {
        cDAO.saveCollection();
        return "테스트";
    }

    @GetMapping("/findtest")
    public String test1() {
        cDAO.findCollection();
        return "test";
    }
}
