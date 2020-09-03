import React from "react";
import ListCoursesComponent from "./ListCoursesComponent";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {CourseComponent} from "./CourseComponent";

function InstructorApp() {
    return (

            <Router>
                <div>
                    <h1>Instructor Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListCoursesComponent} />
                        <Route path="/courses" exact component={ListCoursesComponent} />
                        <Route path="/courses/:id" component={CourseComponent} />
                    </Switch>
                </div>
            </Router>

    );
}

export default InstructorApp;
