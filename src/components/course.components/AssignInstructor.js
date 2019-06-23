import React,{Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";


export default class AssignInstructor extends Component{

    constructor(props){
        super(props);



        this.onChangeCourseInstructor = this.onChangeCourseInstructor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state={
            course_id :'',
            courseName: '',
            courseId: '',
            courseInstructor: '',
            instructorList: [],
            isCourseAccepted:false
        }

    }

    onChangeCourseInstructor(e){
        this.setState({
            courseInstructor: e.target.value
        });
    }


    // this will get all the train details from the database
    componentDidMount() {
        axios.get('http://localhost:4000/api/courses/'+this.props.match.params.coursecode)
            .then(response => {

                for (var course of response.data) {this.setState({

                    name: course.name,
                    courseId: course.courseId,
                    isCourseAccepted: false,
                    courseInstructor:course.courseInstructor,
                    course_id:course._id

                })
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/api/otherUsers/')
            .then(response => {

                this.setState({
                    instructorList:response.data
                })

            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onSubmit(e){
        e.preventDefault();



        const obj = {
            name: this.state.name,
            courseInstructor: this.state.courseInstructor,
            courseId: this.state.courseId,
            isCourseAccepted: this.state.isCourseAccepted,
            _id: this.state.course_id
        };
        axios.put('http://localhost:4000/api/courses/'+this.state.courseId, obj)
            .then(res => console.log(res.data))
            .catch(function (err) {
                console.log(err);
            });
    }

    render(){
        this.componentDidMount();
        return(


            <div style={{margineTop: 50}}>
                <div className="container">
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <h1>Course Assignment of Instructor</h1>
                        </div>

                        <div className="form-group">
                            <label>Course Code:</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.courseId}
                                   readOnly={true}/>
                        </div>

                        <div className="form-group">
                            <label>Course Name:</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.name}
                                   readOnly={true}/>
                        </div>

                        <div className="form-group">
                            <label>Instructor Assignment:</label>
                            <select
                                name="subject"
                                className="form-control"
                                onChange={this.onChangeCourseInstructor}
                                value={this.state.courseInstructor}

                            >
                                {
                                    this.state.instructorList.map(instructor => {
                                        return (
                                            <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
                                        )
                                    })
                                }
                            </select>
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
