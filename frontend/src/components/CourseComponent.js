import React, {Component} from 'react';
import CourseDataService from "../services/CourseDataService";
import {ErrorMessage, Field, Form, Formik} from "formik";

export class CourseComponent extends Component{
    constructor(props) {
        super(props);
        this.state={
            id: this.props.match.params.id,
            desc: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this)
    }

    componentDidMount() {
        console.log("did mount")
        CourseDataService.retrieveOneCourse(this.state.id)
            .then((res) => {
                this.setState({
                    desc: res.data.description
                })
            })
    }

    onSubmit(values) {
        console.log(values);
        let course = {
            id: values.id,
            description: values.desc
        }
        CourseDataService.updateCourseById(values.id, course)
            .then(() => this.props.history.push("/courses"))
    }

    validateForm(values) {
        let errors = {}
        if (!values.desc) {
            errors.desc = 'Enter a Description'
        } else if (values.desc.length < 5) {
            errors.desc = 'Enter at least 5 Characters in Description'
        }

        return errors
    }

    render() {
        console.log("render");
        let {id, desc} = this.state;
        return (
            <div>
                <h3>Course</h3>

                <div className="container">

                    <Formik
                        initialValues={{ id, desc }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validateForm}
                        enableReinitialize={true}
                    >

                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="desc" component="div"
                                                  className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="desc" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        );
    }
}