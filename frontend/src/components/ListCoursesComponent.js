import React, {useEffect, useState} from 'react';
import CourseDataService from "../services/CourseDataService";
import {Field, Form, Formik} from "formik";
import AddCourseComponent from "./AddCourseComponent";

function ListCoursesComponent(props) {

    const [courses, setCourses] = useState([]);
    const [isDisplayAdd, setIsDisplayAdd] = useState(false);

    useEffect(() => {
        refreshCourses();
    }, [])

    function refreshCourses(){
        CourseDataService.retrieveAllCourses()
            .then((res) => {
                console.log(res);
                setCourses(res.data);
            });
    }

    function deleteCourseClicked(id, index){
        let coursesTmp = [...courses];
        coursesTmp.splice(index, 1);
        setCourses(coursesTmp);
        CourseDataService.deleteCourseById(id)
            .then((res) => {
                console.log(res);
            })
    }

    function updateCourseClicked(id, index){
        props.history.push(`/courses/${id}`);
    }

    function addCourseClicked() {
        setIsDisplayAdd(!isDisplayAdd);
    }

    function onSubmit(event) {
        event.preventDefault();
        console.log(event.target);
    }

    return (
        <div className="container">
            <h3>All courses</h3>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            courses.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.id}</td>     
                                    <td>{course.description}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={()=>updateCourseClicked(course.id, index)}>
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning" onClick={()=>deleteCourseClicked(course.id, index)}>
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="row">
                <button className="btn btn-success" onClick={()=>addCourseClicked()}>Add Course</button>
            </div>

            {
                isDisplayAdd ? (
                    <AddCourseComponent added={refreshCourses}/>
                ) : (<div></div>)
            }

        </div>
    );
}

export default ListCoursesComponent;
