import React from 'react';
import {
    Collapse,
    Navbar,
    Card,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import studentPortalLogo from '../assets/img/studentPortalImgs.png';


const StudentMenu = () =>{
   return(
    <Navbar>
        <div>
            <NavItem className="ml-auto">
                <NavLink href="/assignment/viewall">

                    <h4><i className="fas fa-graduation-cap"/><b>View Assignments and Exams</b></h4>
                </NavLink>
            </NavItem>
        </div>
    </Navbar>);
};
const AdminMenu = () =>{
    return(
        <Navbar color="light" light expand="md">


        <div>
            <NavItem className="ml-auto">
                <NavLink href="/course/add">

                    <h4><i className="fas fa-graduation-cap"/><b>Add Courses</b></h4>
                </NavLink>
            </NavItem>
        </div>

        <div>
            <NavItem className="ml-auto">
                <NavLink href="/student/signup">

                    <h4><i className="fas fa-home"/><b>Add Students</b></h4>
                </NavLink>
            </NavItem>
        </div>

        <div>
            <NavItem className="ml-auto">
                <NavLink href="/superuser/add">

                    <h4><i className="fas fa-home"/><b>Add Super Users</b></h4>
                </NavLink>
            </NavItem>
        </div>


    </Navbar>);

};

const InstructorMenu = () =>{
    return(
        <Navbar color="light" light expand="md">
            <div>
                <NavItem className="ml-auto">
                    <NavLink href="/assignment/add">

                        <h4><i className="fas fa-graduation-cap"/><b>Add Assignments and Exams</b></h4>
                    </NavLink>
                </NavItem>
            </div>

            <div>
                <NavItem className="ml-auto">
                    <NavLink href="/assignment/viewall">

                        <h4><i className="fas fa-graduation-cap"/><b>View Assignments and Exams</b></h4>
                    </NavLink>
                </NavItem>
            </div>

        </Navbar>);

};

export default class MenuBar extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            isOpen: false,
            isAuthenticated: false
        };
        let email = localStorage.getItem('email');
        if (email != '') {
            this.state.isAuthenticated = false;
        }
    }
    logout = () => {
        console.log('Clicked');
        this.setState({
            isAuthenticated: false
        });
        localStorage.setItem('email',null);
        localStorage.setItem('role',null);

        this.props.history.push(`/`);
    };


    componentDidMount() {

        this.state = {
            isOpen: false,
            isAuthenticated: false
        };
        let email = localStorage.getItem('email');
        if (email !== '' || email !== null) {
            this.state.isAuthenticated = false;
        }
        else{
            this.state.isAuthenticated = true;
        }

    }

    componentDidUpdate() {

        this.state = {
            isOpen: false,
            isAuthenticated: false,
            role:''
        };
        let email = localStorage.getItem('email');
        let role = localStorage.getItem('role');
        console.log(email);
        if (email !== '[]') {
            this.state.isAuthenticated = false;
            this.state.role = '';

        }
        else{
            this.state.role = role;
            this.state.isAuthenticated = true;
        }

    }


    render() {
        this.componentDidUpdate();
        return (
            <div>

                <Navbar color="light" light expand="md">

                        <div>
                            <NavItem className="ml-auto">
                                <NavLink href="/">

                                    <h4><i className="fas fa-home"/><b>Student Portal</b></h4>
                                </NavLink>
                            </NavItem>
                        </div>

                        <div>
                            <NavItem className="ml-auto">
                                <NavLink href="/course/viewall">

                                    <h4><i className="fas fa-graduation-cap"/><b>View Courses</b></h4>
                                </NavLink>
                            </NavItem>
                        </div>
                    {localStorage.getItem('role').localeCompare('INSTRUCTOR') === 0 ? <InstructorMenu/> : (localStorage.getItem('role').localeCompare('ADMIN') === 0 ? <AdminMenu/>:(localStorage.getItem('role').localeCompare('STUDENT') === 0 ?<StudentMenu/>:null))};


                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { localStorage.getItem( 'email').localeCompare(null) !== 0?

                                <div>
                                    <NavItem>
                                        <NavLink onClick={this.logout}><h4>Hi Instructor 01 <span/><b>Log out</b>  <i className="fas fa-sign-out-alt"></i></h4>

                                        </NavLink>
                                    </NavItem>
                                </div>
                                :
                                <div>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem className="ml-auto">
                                            <NavLink href="/student/signup/"><h4><b>Sign up</b>  <i className="fas fa-user-plus"></i></h4>

                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/student/login/"><h4><b>Sign In</b><i className="fas fa-sign-in-alt"></i></h4>

                                            </NavLink>
                                        </NavItem></Nav>
                                </div>
                            }

                        </Nav>
                    </Collapse>
                </Navbar>

            </div>
        );
    }
}