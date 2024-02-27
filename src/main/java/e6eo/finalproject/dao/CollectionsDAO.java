package e6eo.finalproject.dao;

import e6eo.finalproject.dto.collectionsList.CollectionsRepository;
import e6eo.finalproject.entity.CollectionsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
public class CollectionsDAO {

    @Autowired
    CollectionsRepository collectionsMapper;

    public void saveCollection() {
        Scanner s = new Scanner(System.in);
        System.out.print("아이디 입력! : ");
        String id = s.next();
        System.out.print("목록 입력! : ");
        ArrayList<String> list = new ArrayList(List.of(s.next().split(",")));
        CollectionsEntity lists = new CollectionsEntity().builder().userId(id).collectionIds(list).build();
        collectionsMapper.save(lists);
    }

    public List<CollectionsEntity> findCollection() {
        List<CollectionsEntity> collections = collectionsMapper.findAll();
        for (CollectionsEntity collection : collections) {
            System.out.println(collection);
        }
        return collections;
    }
}
