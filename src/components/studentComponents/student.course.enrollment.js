import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const UnenrolledCourseTable = props => (

    <tr>
        <td>{props.course.name}</td>
        <td>{props.course.courseId}</td>
        <td>{props.course.courseInstructor}</td>
        <td>
            <Link to={"/enrollcourse/"+props.course._id}>Enroll Now</Link>
        </td>
    </tr>

);

export default class StudentCourseEnrollment extends Component {



    constructor(props) {
        super(props);

        this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeCourseInstructor = this.onChangeCourseInstructor.bind(this);


        this.state = {
            courseCode: '',
            courseName: '',
            courseInstructor: '',
            email:'',
            courseList:[],
            unEnrolledCourses:[],
            student: {

                name: '',
                userName:'',
                email: '',
                password: '',
                admissionYear: '',
                gpa: '',
                courses: []
            }


        };

    }
    componentDidMount() {

        let email = localStorage.getItem('email');


        if(email == ''){
            this.props.history.push(`/login`);
        }
        this.setState({
            email: email
        });

        axios.get('http://localhost:4000/students/'+ email).then(res => {

            var studentObj = res.data;

            this.setState({
                student: {
                    name: studentObj.name,
                    regNumber:studentObj.regNumber,
                    email: studentObj.email,
                    password: studentObj.password,
                    admissionYear: studentObj.admissionYear,
                    gpa: studentObj.gpa,
                    courses: studentObj.courses
                }
            })

        }).catch(function (err) {
            console.log(err);
        });
        axios.get('http://localhost:4000/courses/unenrolled'+email).then(res => {
            var courseDetails = JSON.stringify(res);

            if (courseDetails != '[]') {

                this.setState({

                    unEnrolledCourses: courseDetails

                })
            }
            else {
                alert('No Courses are available to Enroll Anymore');
            }

        }).catch(function (err) {
            console.log(err);
        })
    }

    onChangeCourseCode(e) {
        this.setState({
            price: e.target.value
        });
    }
    onChangeCourseName = (e) =>{
        this.setState({
            bookingDate: e.target.value
        });
    };

    onChangeCourseInstructor(e) {
        this.setState({
            trainName: e.target.value
        });
    }

    courseList(){

        return this.state.unEnrolledCourses.map(function (currentCourse, i) {
            return <UnenrolledCourseTable course={currentCourse} key={i}/>
        });
    }

    render() {
        return (
            <div>

                <table className="table table-striped " style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Course ID</th>
                        <th>course Instructor</th>
                        <th>Enroll</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.courseList()}
                    </tbody>
                </table>

            </div>
        )

    }
}