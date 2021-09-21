"use strict";
import React from "react";

export default class ProjectList extends React.Component {
    render() {
        let numberSubsection = this.props.numberSubsection;
        let projectList = Array(numberSubsection).fill().map((_, i) => (
            <Project key={i.toString()} order={i} />
        ));
        return (
            <div>
                {this.props.displayed &&
                    <div className="row section">
                        <h5 className="sectionHeader">Projects</h5>
                        <ul className="sectionContent">
                            {projectList}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class Project extends React.Component {
    constructor(props) {
        super(props);
        let order = this.props.order;
        this.textInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            projectName: sessionStorage.getItem(`projectName-${order}`) || '',
            projectDetail: sessionStorage.getItem(`projectDetail-${order}`) || '',
        };
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
        if (name === "projectDetail") {
            target.style.height = "auto";
            target.style.height = `${Math.max(target.scrollHeight, 45)}px`;
        }
    }

    render() {
        let order = this.props.order;
        return (
            <li className="sectionContent">
                <ul>
                    <li><input name="projectName" className='left-max' placeholder={`Project's name ${order}`} value={this.state.projectName} onChange={this.handleInputChange} /></li>
                    <li><textarea name="projectDetail" className='left-max' placeholder={`more details ${order}`} value={this.state.projectDetail} ref={this.textInput} onInput={this.handleInputChange} /></li>
                </ul>
            </li>
        )
    }
}