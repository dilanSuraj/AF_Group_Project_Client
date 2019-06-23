import React,{Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';

export default class createAssignment extends  Component{
    constructor(props){
        super(props);

        this.onChangeassignmentCode = this.onChangeassignmentCode.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangecourseCode = this.onChangecourseCode.bind(this);
        this.onChangetypeOfExam = this.onChangetypeOfExam.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onChangemarks = this.onChangemarks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            assignmentExamCode: '',
            description: '',
            courseCode: '',
            typeOfExam: '',
            marks: '',
            deadlineDate: '',
            courses: [],
            typeOfExams: []
        }
    }

    onChangeassignmentCode(e){
        this.setState({
            assignmentExamCode: e.target.value
        });
    }

    onChangedescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangecourseCode(e){
        this.setState({
            courseCode: e.target.value
        });
    }

    onChangetypeOfExam(e){
        this.setState({
            typeOfExam: e.target.value
        });
    }
    onChangemarks(e){
        this.setState({
            marks: e.target.value
        });
    }
    onChangedeadline(e){
        this.setState({
            deadlineDate: e.target.value
        });
    }



    // this method will submit the card payment details
    onSubmit(e){
        e.preventDefault();



            const newAssignment = {
                assignmentExamCode: this.state.assignmentExamCode,
                description: this.state.description,
                courseCode: this.state.courseCode,
                typeOfExam: this.state.typeOfExam,
                marks: this.state.marks,
                deadlineDate: this.state.deadlineDate
            }

            if (this.state.assignmentExamCode == null) {

            }
            axios.post('http://localhost:4000/api/assignmentexams', newAssignment)
                .then(res => console.log(res.data));

            this.setState({
                assignmentExamCode: '',
                description: '',
                courseCode: '',
                typeOfExam: '',
                marks: '',
                deadlineDate: '',
                courses: [],
                typeOfExams: []
            })

    }
    componentDidMount(){
        axios.get('http://localhost:4000/api/courses').then(
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
                            <h1>Assignment Creation</h1>
                        </div>

                        <div className="form-group">
                            <label>Assignment Code:</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.assignmentExamCode}
                                   onChange={this.onChangeassignmentCode}/>
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.description}
                                   onChange={this.onChangedescription}/>
                        </div>

                        <div className="form-group">
                            <label>Course Code:</label>


                            <select
                                name="subject"
                                className="form-control"
                                onChange={this.onChangecourseCode}
                                value={this.state.courseCode}
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

                        <div className="form-group">
                            <label>Type of Exam:</label>


                            <select
                                name="subject"
                                className="form-control"
                                onChange={this.onChangetypeOfExam}
                                value={this.state.typeOfExam}>
                                <option  value="CA">CA</option>
                                <option  value="FINAL">FINAL</option>
                            </select>


                        </div>

                        <div className="form-group">
                            <label>Marks:</label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.marks}
                            onChange={this.onChangemarks}/>
                        </div>

                        <div className="form-group">
                            <label>Deadline:</label>
                            <input type="date"
                                   value={this.state.deadlineDate}
                                   className="form-control"
                                    onChange={this.onChangedeadline}/>
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
