"use strict";
import React from "react";

export default class SkillList extends React.Component {
    render() {
        let numberSubsection = this.props.numberSubsection;
        let skills = Array(numberSubsection).fill().map((_, i) => (
            <Skill key={i.toString()} order={i} />
        ));
        return (
            <div>
                {this.props.displayed &&
                    <div id="skills" className="row section">
                        <h5 className="sectionHeader">Skills</h5>
                        <ul className="sectionContent">
                            {skills}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class Skill extends React.Component {
    constructor(props) {
        super(props);
        let order = this.props.order;
        this.textInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            skillDetail: sessionStorage.getItem(`skillDetail-${order}`) || '',
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
        target.style.height = "auto";
        target.style.height = `${Math.max(target.scrollHeight, 45)}px`;
    }

    render() {
        let order = this.props.order;
        return (
            <li className="subSection">
                <div className="details">
                    <textarea name="skillDetail" placeholder={`more details ${order}`} value={this.state.skillDetail} ref={this.textInput} onInput={this.handleInputChange} />
                </div>
            </li>
        )
    }
}