import React, { Component } from 'react';
import '../App.css';
import {
    Card
} from 'reactstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import homePageBgImg from '../assets/img/backgroundImg.jpg';

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { tickets: [] };
    }


    render() {
        return(

            <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                <img className="card-img-bottom" src={homePageBgImg} alt="Card image cap"/>
            </Card>
        );
    }
}


