import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const AssignmentTable = props => (
    <tr>
        <td>{props.exam.assignmentExamCode}</td>
        <td>{props.exam.description}</td>
        <td>{props.exam.typeOfExam}</td>
        <td>{props.exam.marks}</td>
        <td>{props.exam.deadlineDate}</td>
        <td>
            <Link to={"/assignment/update/"+props.exam.assignmentExamCode}>Update</Link>
        </td>
    </tr>

);

export default class CourseList extends Component{

    constructor(props){
        super(props);
        this.state = {exam: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/assignmentexams').then(res => {
            this.setState({
                exam: res.data
            });
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });

    }

    examList(){
        return this.state.exam.map(function (currentExam, i) {
            return <AssignmentTable exam={currentExam} key={i}/>
        });
    }

    render(){
        return(
            <div>

                <table className="table table-striped " style={{ marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Assignment Code</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Marks</th>
                        <th>Deadline</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.examList() }
                    </tbody>
                </table>

            </div>
        )
    }
}
