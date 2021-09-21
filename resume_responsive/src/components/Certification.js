"use strict";
import React from "react";

export default class Certification extends React.Component {
    render() {
        let numberSubsection = this.props.numberSubsection;
        let certificateList = Array(numberSubsection).fill().map((_, i) => (
            <Certificate key={i.toString()} order={i} />
        ));
        return (
            <div>
                {this.props.displayed &&
                    <div className="row section">
                        <h5 className="sectionHeader">Certification</h5>
                        <ul className="sectionContent">
                            {certificateList}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class Certificate extends React.Component {
    constructor(props) {
        super(props);
        let order = this.props.order;
        this.state = {
            certificatePeriod: sessionStorage.getItem(`certificatePeriod-${order}`) || '',
            certificateName: sessionStorage.getItem(`certificateName-${order}`) || '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        let order = this.props.order;
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
        sessionStorage.setItem(`${name}-${order}`, value);
    }

    render() {
        return (
            <li className='subSection'>
                <ul>
                    <li><input name="certificatePeriod" className='left-max' placeholder="valid period" value={this.state.certificatePeriod} onChange={this.handleInputChange} /></li>
                    <li><input name="certificateName" className="left-max" placeholder="certificate" value={this.state.certificateName} onChange={this.handleInputChange} /></li>
                </ul>
            </li>
        )
    }
}