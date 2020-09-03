import React, {useState} from 'react';
import CourseDataService from "../services/CourseDataService";

export default function (props) {
    const [description, setDescription] = useState("");

    function onChangeInput(event) {
        setDescription(event.target.value);
    }

    function onSubmitForm(event) {
        event.preventDefault();
        let course = {
            description: description
        }
        CourseDataService.addCourse(course)
            .then(()=>{
                props.added();
            });

        setDescription("");
    }

    return (
        <form action="#" onSubmit={onSubmitForm}>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input type="text" className="form-control" id="desc" value={description}
                       placeholder="Enter description" name="desc" onChange={onChangeInput}/>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    );
}