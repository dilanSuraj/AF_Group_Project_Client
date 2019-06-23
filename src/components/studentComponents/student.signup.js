import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';
import swal from 'sweetalert2';

export  default class StudentSignup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            regNumber:'',
            email: '',
            password: '',
            cPassword:'',
            admissionYear: '',
            courses: [],
            courseList:[]

        }

    }

    componentDidMount() {

        Axios.get('http://localhost:4000/api/courses/').then(res => {

            var courseDetails = JSON.stringify(res.data);


            if (courseDetails === '[]') {
                swal.fire({
                    title: "Course Error!!",
                    text: "No Courses exist",
                    type: "error",
                    timer: 1000,
                    showConfirmButton: true
                }, function () {
                    console.log('home');
                    window.location.href = "../index.js";
                });
                console.log("Error");

                return null;
            } else {

                this.setState({courseList: res.data});

            }

        }).catch(function (err) {
            console.log(err);
        });
    }



    onChangeName = (e) => {
        this.setState({

            name: e.target.value

        });
    };

    onChangeEmail = (e) => {
        this.setState({

            email: e.target.value

        });
    };

    onChangePassword = (e) => {
        this.setState({

            password: e.target.value

        });
    };

    onChangeConfirmPassword = (e) => {
        this.setState({

            cPassword: e.target.value

        });
    };

    onChangeAdmissionYear = (e) => {
        this.setState({

            admissionYear: e.target.value

        });
    };


    onChangeCourses = (e) => {
        this.setState({

            courses: e.target.value

        });


    };

    signup = () => {

        if (this.state.name == '' ||this.state.email == '' || this.state.password == '' || this.state.cPassword == '' || this.state.admissionYear == '' || this.state.courses == '') {
            alert("Please fill the fields");
            return;
        }

        if (this.state.password != this.state.cPassword) {
            alert("Two passwords much match");
            return;
        }

        let student = {
            name: this.state.name,
            regNumber: 'IT17121002',
            email: this.state.email,
            password: this.state.password,
            admissionYear: this.state.admissionYear,
            gpa: {
                semesterNumber:1,
                gpaValue:0
            },
            courses : this.state.courses
        };

        Axios.get('http://localhost:4000/api/students/' + student.email).then(res => {

            var studentDetails = JSON.stringify(res.data);

            if (studentDetails != '[]') {
                swal.fire({
                    title: "Email Error!!",
                    text: "Email Already exists",
                    type: "error",
                    timer: 1000,
                    showConfirmButton: true
                }, function(){
                    console.log('home');
                    window.location.href = "../index.js";
                });
            }
            else {
                Axios.post('http://localhost:4000/api/students/', student).then(() => {
                        swal.fire({
                            title: "Success!",
                            text: "Successfully sign up",
                            type: "success",
                            timer: 1000,
                            showConfirmButton: false
                        }, function () {
                            this.props.history.push('/');
                        });
                    }

                ).catch(function (err) {
                    console.log(err);
                });
            }

        }).catch(function (err) {
            console.log(err);
        })



    };

    render() {

        return (
            <div className="container shadow-lg p-3 mb-5 bg-white rounded" style={{ marginTop: 120 }}>
                <Form>
                    <h3> Sign Up</h3>
                    <Form.Group>
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={this.state.name} onChange={this.onChangeName} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} />
                        <Form.Text className="text-muted">
                            We will never share your email anyone
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={this.state.cPassword} onChange={this.onChangeConfirmPassword} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Admission Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Admission Year" value={this.state.admissionYear} onChange={this.onChangeAdmissionYear} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select Course</Form.Label>
                        <select
                            name="subject"
                            className="form-control"
                            onChange={this.onChangeCourses}
                            value={this.state.courses}

                        >
                            {
                                this.state.courseList.map(course => {
                                    return (
                                        <option key={course._id} value={course._id}>{course.name}</option>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.signup}>
                        SignUp
                    </Button>
                </Form>
            </div>
        );
    }


}