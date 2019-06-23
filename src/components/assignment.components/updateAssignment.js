import React,{Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import { breakStatement, isBreakStatement } from "@babel/types";


export default class CreateReservation extends Component{

    constructor(props){
        super(props);


        this.onChangeassignmentCode = this.onChangeassignmentCode.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangecourseCode = this.onChangecourseCode.bind(this);
        this.onChangetypeOfExam = this.onChangetypeOfExam.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onChangemarks = this.onChangemarks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state={
            assignmentExamCode: '',
            description: '',
            courseCode: '',
            typeOfExam: '',
            marks: '',
            deadlineDate: '',
            deadlineError: '',
            deadlinePrevious:''
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




    // this will get all the  details from the database
    componentDidMount() {
        axios.get('http://localhost:4000/api/assignmentexams/'+this.props.match.params.assignmentExamCode)
            .then(response => {

                for (var user of response.data) {this.setState({

                    assignmentExamCode: user.assignmentExamCode,
                    description: user.description,
                    courseCode: user.courseCode,
                    typeOfExam: user.typeOfExam,
                    marks: user.marks,
                    deadlineDate: user.deadlineDate,
                    deadlinePrevious: user.deadlineDate

                })
                }

            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onSubmit(e){
        e.preventDefault();


        if (this.state.deadlineDate < this.state.deadlinePrevious) {
            alert('You can not choose a previous deadline than the orginal one');
            breakStatement();
            return 0;
        }

        const obj = {
            assignmentExamCode: this.state.assignmentExamCode,
            description: this.state.description,
            courseCode: this.state.courseCode,
            typeOfExam: this.state.typeOfExam,
            marks: this.state.marks,
            deadlineDate: this.state.deadlineDate
        };
        axios.put('http://localhost:4000/api/assignmentexams/'+this.state.assignmentExamCode, obj)
            .then(res => console.log(res.data))
            .catch(function (err) {
                console.log(err);
            });

        alert('Successfully Updated');

        this.setState({
            assignmentExamCode: '',
            description: '',
            courseCode: '',
            typeOfExam: '',
            marks: '',
            deadlineDate: '',
            deadlineError: '',
            deadlinePrevious:''
        })


    }





    render(){

        return(


            <div style={{margineTop: 50}}>
                <div className="container">
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <h1>Update Assignment</h1>
                        </div>

                        <div className="form-group">
                            <label>Assignment Code:</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.assignmentExamCode}
                                   readOnly={true}/>
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.description}
                                   readOnly={true}/>
                        </div>







                        <div className="form-group">
                            <label>Type of Exam:</label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.typeOfExam}
                                    onChange={this.onChangetypeOfExam}
                                    readOnly={true}/>
                        </div>

                        <div className="form-group">
                            <label>Deadline:</label>
                            <input type="date"
                                   value={this.state.deadlineDate}
                                   className="form-control"
                                   onChange={this.onChangedeadline}
                                   aria-errormessage={this.state.deadlineError}/>
                        </div>

                        <div style={{frontSize: 12, color: "red"}}>{this.state.deadlineError}</div>




                        <div>
                            <p></p>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Update" className="btn btn-primary"/>
                        </div>

                    </form>
                </div>
            </div>



        );
    }
}
