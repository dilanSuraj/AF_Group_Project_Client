import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';
import swal from 'sweetalert2';


export default class SuperUserSignup extends Component {

    constructor(props) {
        super(props);

        this.state = {

            name: '',
            email: '',
            password: '',
            cPassword: '',
            role: '',
            JoinedDate: '',
            qualifications: '',
            roleList:['ADMIN', 'INSTRUCTOR']

        }

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

    onChangeRole = (e) => {
        this.setState({

            role: e.target.value

        });
    };

    onChangeJoinedDate = (e) => {
        this.setState({

            JoinedDate: e.target.value

        });
    };

    onChangeQualifications= (e) => {
        this.setState({

            qualifications: e.target.value

        });
    };

    signup = () => {

        if (this.state.name == '' || this.state.email == '' || this.state.password == '' || this.state.cPassword == '' || this.state.role == '' || this.state.JoinedDate == '' || this.state.qualifications == '') {
            alert("Please fill the fields");
            return;
        }

        if (this.state.password != this.state.cPassword) {
            alert("Two passwords much match");
            return;
        }

        let user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            JoinedDate: this.state.JoinedDate,
            qualifications: this.state.qualifications
        };

        Axios.get('http://localhost:4000/api/otherusers/' + user.email).then(res => {
            
            var userDetails = JSON.stringify(res.data);
            
            if (userDetails != '[]') {
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
                Axios.post('http://localhost:4000/api/otherusers/', user).then(() => {
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
                        <Form.Label>User Name</Form.Label>
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
                        <Form.Label>Select Role</Form.Label>
                        <select
                            name="subject"
                            className="form-control"
                            onChange={this.onChangeRole}
                            value={this.state.role}
                        >
                            {
                                this.state.roleList.map(role => {
                                    return (
                                        <option key={role} value={role}>{role}</option>
                                    )
                                })
                            }> </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Joined Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter mobile number" value={this.state.JoinedDate} onChange={this.onChangeJoinedDate()} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Qualifications</Form.Label>
                        <Form.Control type="text" placeholder="Enter NIC Number" value={this.state.qualifications} onChange={this.onChangeQualifications} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.signup}>
                        SignUp
                </Button>
                </Form>
            </div>
        );
    }


}