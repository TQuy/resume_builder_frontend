'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import { validate, str2bool } from "./Base";
import Resume from "./Resume";

export default class ResumeMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicInfo: str2bool(sessionStorage.getItem('basicInfo')),

            education: str2bool(sessionStorage.getItem('education')),
            numberSchool: validate(sessionStorage.getItem('numberSchool')),

            employment: str2bool(sessionStorage.getItem('employment')),
            numberCompany: validate(sessionStorage.getItem('numberCompany')),

            certification: str2bool(sessionStorage.getItem('certification')),
            numberCertificate: validate(sessionStorage.getItem('numberCertificate')),

            projectList: str2bool(sessionStorage.getItem('projectList')),
            numberProject: validate(sessionStorage.getItem('numberProject')),

            skillList: str2bool(sessionStorage.getItem('skillList')),
            numberSkill: validate(sessionStorage.getItem('numberSkill')),
        };
        this.handleSection = this.handleSection.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
    }

    handleSection(section, displayed) {
        this.setState({
            [section]: displayed
        });
        sessionStorage.setItem(section, displayed);
    }

    handlePrint() {
        window.print();
    }

    render() {
        // console.log('Current source state: ', this.state);
        let resumeName = sessionStorage.getItem('currentResumeName') || 'Blank';
        return (
        <div>
            <a id="print_btn" className="btn btn-secondary d-print-none" href="/resume_responsive/">Back</a>
            <button id="print_btn" className="btn btn-primary d-print-none" onClick={this.handlePrint}>Print/Save as PDF</button>
            <h1 className="d-print-none" style={{ textAlign: 'center' }}>{resumeName}</h1>
            <Navigation
                onChange={this.handleSection}
                sectionStates={this.state} />
            <div className='sheet padding-10mm'>
                <Resume sectionInfo={this.state}/>
            </div>
        </div>
        );
    }
}

ReactDOM.render(<ResumeMaker />, document.querySelector('#root'));
