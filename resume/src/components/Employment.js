"use strict";
import React from "react";

export default class Employment extends React.Component {
    render() {
        let numberSubsection = this.props.numberSubsection;
        let companyList = Array(numberSubsection).fill().map((_,i) => (
            <Company key={i.toString()} order={i} />
        ));
        return (
            <div>
                {this.props.displayed &&
                    <div id="employment" className="row section">
                        <h5 className="sectionHeader">Employment</h5>
                        <ul className="sectionContent">
                            {companyList}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class Company extends React.Component {    
    constructor(props) {
        super(props);
        let order = this.props.order;
        this.state = {
            companyPeriod: sessionStorage.getItem(`companyPeriod-${order}`) || '',
            companyName: sessionStorage.getItem(`companyName-${order}`) || '',
            companyPosition: sessionStorage.getItem(`companyPosition-${order}`) || '',
            companyDetail: sessionStorage.getItem(`companyDetail-${order}`) || '',
        };
        this.textInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        // control height of textarea on its first render
        let node = this.textInput.current;
        node.style.height = `${Math.max(node.scrollHeight, 45)}px`;
        // hide vertical scroll bar
        node.style.overflowY = 'hidden';
    }

    handleInputChange(event) {
        // set the state to the input value
        let order = this.props.order;
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
        // save subsection value
        sessionStorage.setItem(`${name}-${order}`, value);
        if (name === 'companyDetail') {
            // reset the behavior of textarea
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
                        <input name="companyPeriod" className="left-max" placeholder={`Working period ${order}`} value={this.state.companyPeriod} onChange={this.handleInputChange} />
                    </div>
                    <div className="col-6">
                        <input name="companyName" className="center-max" placeholder={`company's name ${order}`} value={this.state.companyName} onChange={this.handleInputChange} />
                    </div>
                    <div className="col-3">
                        <input name="companyPosition" className="right-max" placeholder={`position ${order}`} value={this.state.companyPosition} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="details">
                    <textarea name="companyDetail" placeholder={`more details ${order}`} value={this.state.companyDetail} ref={this.textInput} onChange={this.handleInputChange} />
                </div>
            </li>
        )
    }
}