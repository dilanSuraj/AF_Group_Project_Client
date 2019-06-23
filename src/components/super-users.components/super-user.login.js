import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert2';



export default class SuperUserLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            role: '',
            JoinedDate: '',
            qualifications: ''

        }
    }

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

    login = () => {
        axios.get('http://localhost:4000/api/otherusers/' + this.state.email + '/' + this.state.password).then(res => {

            var userDetails = JSON.stringify(res.data);

            if (userDetails != '[]') {
                for (var user of res.data) {
                    var name = user.name;
                    var role = user.role;
                    var JoinedDate = user.JoinedDate;
                    var qualifications = user.qualifications;
                    var role = user.role;
                }

                this.setState({
                    name: name,
                    JoinedDate: JoinedDate,
                    qualifications: qualifications,
                    role:role
                });
                localStorage.setItem("email", this.state.email);
                localStorage.setItem("role", this.state.role);

                swal.fire({
                    title: "Successful",
                    text: "Successfully logged In",
                    type: "success",
                    timer: 1000,
                    showConfirmButton: true
                });
                this.props.history.push(`/`);


            }
            else {

                swal.fire({
                    title: "Error",
                    text: "Login Unsuccessful!",
                    type: "error",
                    timer: 1000,
                    showConfirmButton: true
                });
                this.props.history.push(`/login`);

            }


        }).catch(function (err) {
            console.log(err);
        });
    };

    render() {

        return (
            <div className="container shadow-lg p-3 mb-5 bg-white rounded" style={{ marginTop: 120 }}>
                <Form>
                    <h3> Super User Login</h3>

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
                    <Button variant="primary" type="button" onClick={this.login}>
                        Login
                </Button>
                </Form>
            </div>
        );
    }


}
