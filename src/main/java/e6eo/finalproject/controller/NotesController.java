package e6eo.finalproject.controller;

import e6eo.finalproject.dao.NotesDAO;
import java.util.Map;

import e6eo.finalproject.dto.NotesMapper;
import e6eo.finalproject.entity.NotesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notes")
public class NotesController {

    @Autowired
    private NotesDAO notesDAO;

    @PostMapping("")
    public ResponseEntity<?> getNotes(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(notesDAO.notesGet(request));
    }

    @PostMapping("/note")
    public ResponseEntity<?> writeNotes(@RequestBody NotesEntity request) {
        return ResponseEntity.ok(true);
    }

    @PatchMapping("/note")
    public ResponseEntity<?> updateNotes(@RequestBody NotesEntity request) {
        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/note")
    public ResponseEntity<?> deleteNotes(@RequestBody NotesEntity request) {
        return ResponseEntity.ok(true);
    }
}
