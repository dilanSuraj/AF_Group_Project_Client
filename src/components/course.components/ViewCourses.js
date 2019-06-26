import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const AdminCourseTable = props => (
    <tr>
        <td>{props.course.name}</td>
        <td>{props.course.courseId}</td>
        <td>{props.course.courseInstructor}</td>
        <td>
            <button><Link to={"/course/assignInstructor/"+props.course._id}>Update</Link></button>
        </td>
        <td>
            <button onClick={(e) => deleteCourse(e,props.course._id)}>Delete</button>
        </td>
    </tr>

);

const StudentCourseTable = props => (
    <tr>
        <td>{props.course.name}</td>
        <td>{props.course.courseId}</td>
        <td>{props.course.courseInstructor}</td>
        <td>
            <button onClick={(e) => enrollCourse(e,props.course._id)}>Delete</button>
        </td>
    </tr>

);
const GuestCourseTable = props => (
    <tr>
        <td>{props.course.name}</td>
        <td>{props.course.courseId}</td>
        <td>{props.course.courseInstructor}</td>
    </tr>

);

const deleteCourse = (event,course_id)=>{
    event.stopPropagation();

    console.log(course_id);
    axios.delete('http://localhost:4000/api/courses/'+course_id).then(res => {
        alert("Course Successfully delete");
    }).catch(function (err) {
        console.log(err);
    });


};

const enrollCourse = (event,course_id)=>{
    event.stopPropagation();


    var studentData = '';
    axios.get('http://localhost:4000/api/student/'+localStorage.getItem('email')).then(res => {
        studentData = res.data
    }).catch(function (err) {
        console.log(err);
    });
    studentData.courses.push(course_id);
    axios.put('http://localhost:4000/api/courses/'+localStorage.getItem('email'),studentData).then(res => {
        alert("Course Successfully Enrolled");
    }).catch(function (err) {
        console.log(err);
    });



};

const InstructorCourseTable = props => (
    <tr>
        <td>{props.course.name}</td>
        <td>{props.course.courseId}</td>
    </tr>

);

export default class CourseList extends Component{

    constructor(props){
        super(props);
        this.state = {
            demo: [],
            otherUser:''};
    }

    componentDidMount() {

        axios.get('http://localhost:4000/api/otherusers/'+localStorage.getItem('email')).then(res => {
            this.setState({
                otherUser: res.data
            });
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });

        axios.get('http://localhost:4000/api/courses/').then(res => {
            this.setState({
                demo: res.data
            });
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });

    }

    courseList(){

        if(localStorage.getItem('role').localeCompare('ADMIN') ===  0) {
            return this.state.demo.map(function (currentCourse, i) {
                return <AdminCourseTable course={currentCourse} key={i}/>
            });
        }

        else if(localStorage.getItem('role').localeCompare('INSTRUCTOR') ===  0) {

            return this.state.demo.map(function (currentCourse, i) {
                return <InstructorCourseTable course={currentCourse} key={i}/>
            });
        }
        // else if(localStorage.getItem('role').localeCompare('STUDENT') ===  0) {
        //
        //     return this.state.demo.map(function (currentCourse, i) {
        //         return <StudentCourseTable course={currentCourse} key={i}/>
        //     });
        // }
        else{
            return this.state.demo.map(function (currentCourse, i) {
                return <GuestCourseTable course={currentCourse} key={i}/>
            });
        }


    }

    render() {

        if (localStorage.getItem('role').localeCompare('INSTRUCTOR') === 0) {

            return (
                <div>

                    <table className="table table-striped " style={{marginTop: 20}}>
                        <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Accept Invitation</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Software Architecture</td>
                            <td>SE3010</td>

                            <td><Link>Accept Invitation</Link></td>


                        </tr>

                        <tr>
                            <td>Distributed System</td>
                            <td>SE3030</td>

                            <td><Link>Accept Invitation</Link></td>


                        </tr>
                        </tbody>
                    </table>

                </div>
            )

        }

        if (localStorage.getItem('role').localeCompare('ADMIN') === 0) {
            return (
                <div>

                    <table className="table table-striped " style={{marginTop: 20}}>
                        <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Course Instructor</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Software Architecture</td>
                            <td>SE3010</td>
                            <td>Mr.Chathura</td>
                            <td><Link>Update</Link></td>
                            <td><Link>Delete</Link></td>


                        </tr>

                        <tr>
                            <td>Distributed System</td>
                            <td>SE3030</td>
                            <td>Mr.Dharshana</td>
                            <td><Link>Update</Link></td>
                            <td><Link>Delete</Link></td>


                        </tr>
                        </tbody>
                    </table>

                </div>
            )
        }

        if (localStorage.getItem('role').localeCompare('STUDENT') === 0) {
            return (
                <div>

                    <table className="table table-striped " style={{marginTop: 20}}>
                        <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Course Instructor</th>
                            <th>Enroll</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Software Architecture</td>
                            <td>SE3010</td>
                            <td>Mr.Chathura</td>
                            <td><Link>Enroll</Link></td>


                        </tr>

                        <tr>
                            <td>Distributed System</td>
                            <td>SE3030</td>
                            <td>Mr.Dharshana</td>
                            <td><Link>Enroll</Link></td>


                        </tr>
                        </tbody>
                    </table>

                </div>
            )
        }

       else{

            return (
                <div>

                    <table className="table table-striped " style={{marginTop: 20}}>
                        <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Course Instructor</th>

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
}
