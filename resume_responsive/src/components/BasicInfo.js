'use strict';
import React from "react";

export default class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: sessionStorage.getItem('gender') || '',
            yearOfBirth: sessionStorage.getItem('yearOfBirth') || '',
            fullName: sessionStorage.getItem('fullName') || '',
            phoneNumber: sessionStorage.getItem('phoneNumber') || '',
            email: sessionStorage.getItem('email') || '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        sessionStorage.setItem(name,value);
    }

    render() {
        return (
            <div>
                {this.props.displayed &&
                    <ul id='basicInfo' className="row section">
                        <li><input type="text" name="fullName" placeholder="full name" value={this.state.fullName} onChange={this.handleInputChange} /></li>
                        <li><input type="text" name="gender" placeholder="gender" value={this.state.gender} onChange={this.handleInputChange} /></li>
                        <li><input type="text" name="yearOfBirth" placeholder="year of birth" value={this.state.yearOfBirth} onChange={this.handleInputChange} /></li>
                        <li><input type="tel" name="phoneNumber" placeholder="phone number" value={this.state.phoneNumber} onChange={this.handleInputChange} /></li>
                        <li><input type="email" name="email" placeholder="email address" value={this.state.email} onChange={this.handleInputChange} /></li>
                    </ul>
                }
            </div>
        );
    }
}
