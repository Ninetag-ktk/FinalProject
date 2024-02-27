package e6eo.finalproject.dao;

import e6eo.finalproject.dto.ListsMapper;
import e6eo.finalproject.entity.ListsEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Scanner;

@Service
public class ListsDAO {

    private final ListsMapper listMapper;

    public void saveList() {
        Scanner s = new Scanner(System.in);
        System.out.print("아이디 입력! : ");
        String id = s.next();
        System.out.print("목록 입력! : ");
        List<String> list = List.of(s.next().split(","));
        ListsEntity lists = new ListsEntity().builder().userId(id).collectionIds(list).build();
        listMapper.save(lists);
    }
}
