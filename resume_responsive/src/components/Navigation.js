'use strict';
import React from "react";
import { validate, str2bool } from "./Base";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : validate(target.value);
        this.props.onChange(name, value);
    }

    render() {
        let sectionStates = this.props.sectionStates;

        let basicInfoCheck = sectionStates.basicInfo;
        let educationCheck = sectionStates.education;
        let employmentCheck = sectionStates.employment;
        let projectListCheck = sectionStates.projectList;
        let certificationCheck = sectionStates.certification;
        let skillCheck = sectionStates.skillList;

        let numberSchool = sectionStates.numberSchool;
        let numberCompany = sectionStates.numberCompany;
        let numberProject = sectionStates.numberProject;
        let numberCertificate = sectionStates.numberCertificate;
        let numberSkill = sectionStates.numberSkill;
        return (
            <div id="navigation" className="dropdown d-print-none">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="sectionSelector" data-bs-toggle="dropdown" aria-expanded="false">
                    Section List
                </button> 
                <ul className="dropdown-menu" aria-labelledby="sectionSelector">
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="basicInfoCheck"
                                name="basicInfo"
                                checked={basicInfoCheck}
                                onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="basicInfoCheck">Basic Information</label>
                            <input 
                                type="number" 
                                className="numberSubSection" 
                                value={1} 
                                readOnly />
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="educationCheck"
                                name="education"
                                checked={educationCheck}
                                onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="educationCheck">Education</label>
                            <input 
                                type="number" 
                                className="numberSubSection" 
                                name="numberSchool" 
                                value={numberSchool}
                                onChange={this.handleInputChange}
                                disabled={!educationCheck} />
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="employmentCheck" 
                                name="employment" 
                                checked={employmentCheck}
                                onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="employmentCheck">Employment</label>
                            <input type="number" 
                                className="numberSubSection" 
                                name="numberCompany" 
                                value={numberCompany} 
                                onChange={this.handleInputChange}
                                disabled={!employmentCheck} />
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="projectListCheck"
                                name="projectList"
                                checked={projectListCheck}
                                onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="projectListCheck">Project</label>
                            <input type="number"
                                className="numberSubSection"
                                name="numberProject"
                                value={numberProject}
                                onChange={this.handleInputChange}
                                disabled={!projectListCheck} />
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="certificationCheck"
                                name="certification"
                                checked={certificationCheck}
                                onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="certificationCheck">Certificates</label>
                            <input type="number"
                                className="numberSubSection"
                                name="numberCertificate"
                                value={numberCertificate}
                                onChange={this.handleInputChange}
                                disabled={!certificationCheck} />
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="skillCheck"
                                name="skillList"
                                checked={skillCheck}
                                onChange={this.handleInputChange} />
                            <label className="form-check-label" htmlFor="skillCheck">Skills</label>
                            <input type="number"
                                className="numberSubSection"
                                name="numberSkill"
                                value={numberSkill}
                                onChange={this.handleInputChange}
                                disabled={!skillCheck} />
                        </div>
                    </li>
                </ul>
                <br></br>
            </div>
        );
    }
}
