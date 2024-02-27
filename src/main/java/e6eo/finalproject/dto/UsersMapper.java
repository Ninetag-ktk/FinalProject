package e6eo.finalproject.dto;


import e6eo.finalproject.entity.UsersEntity;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersMapper extends JpaRepository<UsersEntity, String> {

}
