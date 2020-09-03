import axios from 'axios';
const INSTRUCTOR = 'in28minutes'
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`

class CourseDataService {
    retrieveAllCourses(){
        return axios.get(`${INSTRUCTOR_API_URL}/courses`);
    }

    retrieveOneCourse(id){
        return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`)
    }

    addCourse(course){
        return axios.post(`${INSTRUCTOR_API_URL}/courses`, course);
    }

    updateCourseById(id, course){
        return axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course);
    }

    deleteCourseById(id){
        return axios.delete(`${INSTRUCTOR_API_URL}/courses/${id}`);
    }
}

export default new CourseDataService();