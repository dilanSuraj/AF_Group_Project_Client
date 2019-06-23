import React,{Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';

export default class createCourse extends  Component{
    constructor(props){
        super(props);

        this.onChangecourseName = this.onChangecourseName.bind(this);
        this.onChangecourseId = this.onChangecourseId.bind(this);
        this.onChangecourseInstructor = this.onChangecourseInstructor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            courseName: '',
            courseId: '',
            courseInstructor: '',
            courses: [],
            isCourseAccepted:false
        }
    }

    onChangecourseName(e){
        this.setState({
            courseName: e.target.value
        });
    }

    onChangecourseId(e){
        this.setState({
            courseId: e.target.value
        });
    }

    onChangecourseInstructor(e){
        this.setState({
            courseInstructor: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newCourse = {
            courseName: this.state.courseName,
            courseId: this.state.courseId,
            courseInstructor: this.state.courseInstructor,
            isCourseAccepted:false
        };

        axios.post('http://localhost:4000/api/courses/', newCourse)
            .then(res => console.log(res.data)).catch((err)=>{
                alert("Course Creation Unsuccessful");
        });

        this.setState({
            courseName: '',
            courseId: '',
            courseInstructor: ''
        })

    }
    componentDidMount(){
        axios.get('http://localhost:4000/api/otherusers').then(
            data => {
                this.setState({
                    courses: data.data
                })
            }

        )
    }


    render() {
        return(
            <div style={{margineTop: 50}}>
                <div className="container">
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <h1>Courses Creation</h1>
                        </div>

                        <div className="form-group">
                            <label>Course Name:</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.courseName}
                                   onChange={this.onChangecourseName}/>
                        </div>

                        <div className="form-group">
                            <label>Course Id:</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.courseId}
                                   onChange={this.onChangecourseId}/>
                        </div>

                        <div className="form-group">
                            <label>Course Instructor:</label>


                            <select
                                name="subject"
                                className="form-control"
                                onChange={this.onChangecourseInstructor}
                                value={this.state.courseInstructor}
                            >
                                {
                                    this.state.courses.map(cou => {
                                        return (
                                            <option key={cou._id} value={cou._id}>{cou.name}</option>
                                        )
                                    })
                                }
                            </select>



                        </div>


                        <div>
                            <p></p>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-primary"/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}
