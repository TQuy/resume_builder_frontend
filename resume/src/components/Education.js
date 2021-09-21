"use strict";
import React from "react";

export default class Education extends React.Component {
    render() {
        let numberSubsection = this.props.numberSubsection;
        let schoolList = Array(numberSubsection).fill().map((_, i) => (
            <School key={i.toString()} order={i} />
        ));
        return (
            <div>
                {this.props.displayed &&
                    <div id="education" className="row section">
                        <h5 className="sectionHeader">Education</h5>
                        <ul className="sectionContent">
                            {schoolList}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class School extends React.Component {
    constructor(props) {
        super(props);
        let order = this.props.order;
        this.state = {
            schoolPeriod: sessionStorage.getItem(`schoolPeriod-${order}`) || '',
            schoolName: sessionStorage.getItem(`schoolName-${order}`) || '',
            schoolLocation: sessionStorage.getItem(`schoolLocation-${order}`) || '',
            schoolDetail: sessionStorage.getItem(`schoolDetail-${order}`) || '',
        };
        this.textInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        let node = this.textInput.current;
        node.style.height = `${Math.max(node.scrollHeight, 45)}px`;
        node.style.overflowY = "hidden";
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
        if (name === "schoolDetail") {
            target.style.height = "auto";
            target.style.height = `${Math.max(target.scrollHeight, 45)}px`;
        } 
    }

    render() {
        let order = this.props.order;
        return (
            <li className="subSection">
                <div className="row">
                    <div className="col-3">
                        <input name="schoolPeriod" className='left-max' placeholder={`learning period ${order}`} value={this.state.schoolPeriod} onChange={this.handleInputChange} />
                    </div>
                    <div className="col-6">
                        <input name="schoolName" className='center-max' placeholder={`school's name ${order}`} value={this.state.schoolName} onChange={this.handleInputChange} />
                    </div>
                    <div className="col-3">
                        <input name="schoolLocation" className='right-max' placeholder={`location ${order}`} value={this.state.schoolLocation} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="details">
                    <textarea name="schoolDetail" placeholder={`more details ${order}`} value={this.state.schoolDetail} ref={this.textInput} onInput={this.handleInputChange} />
                </div>
            </li>
        )
    }
}