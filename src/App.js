import React, { Component } from 'react';
import HomeComponent from './components/home.component';
import NavBar from './components/navBar';
import MenuBar from './components/menuBar';

import AddAssignment from './components/assignment.components/createAssignment';
import ViewAssignments from './components/assignment.components/viewAssignments';
import UpdateAssignment from './components/assignment.components/updateAssignment';

import AddCourse from './components/course.components/createCourse';
import ViewCourses from './components/course.components/ViewCourses';
import AssignInstructor from './components/course.components/AssignInstructor';

import StudentSignUp from './components/studentComponents/student.signup';
import StudentLogin from './components/studentComponents/student.login';

import SuperUserSignUp from './components/super-users.components/super-user.signup';
import SuperUserLogin from './components/super-users.components/super-user.login';


import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {

    componentDidMount(){
        document.title = "Student Portal"
    }

    render() {

        return (
            <Router>
                <Route path="/*" exact component={NavBar} />
                <Route path="/*" exact component={MenuBar} />
                <Route path="/" exact component={HomeComponent} />

                <Route path="/student/login" component={StudentLogin} />
                <Route path="/student/signup" component={StudentSignUp} />

                <Route path="/superuser/login" component={SuperUserLogin} />
                <Route path="/superuser/add" component={SuperUserSignUp} />

                <Route path="/assignment/add" component={AddAssignment} />
                <Route path="/assignment/viewall" component={ViewAssignments} />
                <Route path="/assignment/update/:assignmentExamCode" component={UpdateAssignment} />

                <Route path="/course/add" component={AddCourse} />
                <Route path="/course/viewall" component={ViewCourses} />
                <Route path="/course/assignInstructor/:instructorid" component={AssignInstructor} />

            </Router>

        );
    }


}

