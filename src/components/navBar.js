import React from 'react';
import {
    Card,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import studentPortalLogo from '../assets/img/studentPortalImgs.png';


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <img
                        alt=""
                        src={studentPortalLogo}
                        width="200"
                        height="120"
                        className="d-inline-block align-top"
                    />


                </Navbar>
                
            </div>
        );
    }
}