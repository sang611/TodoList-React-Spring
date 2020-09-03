package com.example.demo;

import com.example.demo.model.Course;
import com.example.demo.service.CoursesHardcodedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" } )
@RestController
public class CourseResource {

    @Autowired
    CoursesHardcodedService service;

    @GetMapping("/instructors/{username}/courses")
    public List<Course> findAllCourse(@PathVariable(name="username") String username){
        return service.findAll();
    }

    @GetMapping("/instructors/{username}/courses/{id}")
    public Course findOneCourse(
            @PathVariable(name="username") String username,
            @PathVariable(name="id") Long id
    ){
        return service.findById(id);
    }

    @PostMapping("/instructors/{username}/courses")
    public ResponseEntity addCourse(
            @PathVariable(name="username") String username,
            @RequestBody Course course
    ) {
        service.addCourse(course);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/instructors/{username}/courses/{id}")
    public ResponseEntity<Course> updateCourseById(
            @PathVariable(name="username") String username,
            @PathVariable(name="id") Long id,
            @RequestBody Course newCourse
    ) {
        Course course = service.updateById(id, newCourse);

        return new ResponseEntity<Course>(course,HttpStatus.OK);

    }

    @DeleteMapping("/instructors/{username}/courses/{id}")
    public ResponseEntity deleteCourseById(
            @PathVariable(name="username") String username,
            @PathVariable(name="id") Long id
    ){
        Course course = service.deleteById(id);
        if(course != null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
