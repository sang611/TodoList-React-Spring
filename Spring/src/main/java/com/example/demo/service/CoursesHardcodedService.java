package com.example.demo.service;

import com.example.demo.model.Course;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CoursesHardcodedService {
    private static List<Course> courseList = new ArrayList<>();
    private static long idCounter = 0;

    static {
        courseList.add(new Course(++idCounter, "Learn Full stack with Spring Boot and Angular"));
        courseList.add(new Course(++idCounter, "Learn Full stack with Spring Boot and React"));
        courseList.add(new Course(++idCounter, "Master Microservices with Spring Boot and Spring Cloud"));
        courseList.add(new Course(++idCounter, "Deploy Spring Boot Microservices to Cloud with Docker and Kubernetes"));
    }

    public List<Course> findAll(){
        return courseList;
    }

    public Course findById(Long id){
        for (Course course : courseList) {
            if (course.getId() == id) {
                {
                    return course;
                }
            }
        }
        return null;
    }

    public void addCourse(Course newCourse) {
        System.out.println(newCourse.toString());
        newCourse.setId((long) courseList.size()+1);
        courseList.add(newCourse);
    }

    public Course updateById(long id, Course newCourse){
        for(Course course : courseList){
            if(course.getId() == id) {
                course.setDescription(newCourse.getDescription());
                return course;
            }
        }
        return null;
    }

    public Course deleteById(long id){
        Course course = findById(id);
        if(course != null){
            courseList.remove(course);
            return course;
        }
        return null;
    }
}
