'use strict';
import React from "react";

import { validate, str2bool } from "./Base";
import Navigation from "./Navigation";
import BasicInfo from "./BasicInfo";
import Education from "./Education";
import Employment from "./Employment";
import ProjectList from "./Project";
import Certification from "./Certification";
import SkillList from "./Skill";

export default class Resume extends React.Component {
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
        }
        this.handleSection = this.handleSection.bind(this);
    }

    handleSection(section, displayed) {
        this.setState({
            [section]: displayed
        });
        sessionStorage.setItem(section, displayed);
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>{this.props.name}</h1>
                <Navigation
                    onChange={this.handleSection}
                    sectionStates={this.state} />
                <div id="resume">
                    <BasicInfo displayed={this.state.basicInfo} numberSubsection={1} />
                    <Education displayed={this.state.education} numberSubsection={this.state.numberSchool} />
                    <Employment displayed={this.state.employment} numberSubsection={this.state.numberCompany} />
                    <ProjectList displayed={this.state.projectList} numberSubsection={this.state.numberProject} />
                    <Certification displayed={this.state.certification} numberSubsection={this.state.numberCertificate} />
                    <SkillList displayed={this.state.skillList} numberSubsection={this.state.numberSkill} />
                </div>
            </div>
        );
    }
}