package e6eo.finalproject.dao;

import e6eo.finalproject.dto.CategoryMapper;
import e6eo.finalproject.entity.CategoryEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
public class CategoryDAO {
    @Autowired
    private CategoryMapper collectionsMapper;

    public void saveCollection() {
        Scanner s = new Scanner(System.in);
        System.out.print("아이디 입력! : ");
        String id = s.next();
        System.out.print("목록 입력! : ");
        String list = s.next();
        CategoryEntity lists = new CategoryEntity().builder().userId(id).categories(list).build();
        collectionsMapper.save(lists);
    }

    public List<CategoryEntity> findCollection() {
        List<CategoryEntity> categories = collectionsMapper.findAll();
        for (CategoryEntity category : categories) {
            System.out.println("확인: " + category);
        }
        return categories;
    }
}
