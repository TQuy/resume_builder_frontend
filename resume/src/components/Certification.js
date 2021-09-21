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
                    <div id="certification" className="row section">
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
        let order = this.props.order;
        return (
            <li className="subSection">
                <div className="row">
                    <div className="col-3">
                        <input name="certificatePeriod" className='left-max' placeholder={`valid period ${order}`} value={this.state.certificatePeriod} onChange={this.handleInputChange} />
                    </div>
                    <div className="col-9">
                        <input name="certificateName" className="left-max" placeholder={`certificate ${order}`} value={this.state.certificateName} onChange={this.handleInputChange} />
                    </div>
                </div>
            </li>
        )
    }
}