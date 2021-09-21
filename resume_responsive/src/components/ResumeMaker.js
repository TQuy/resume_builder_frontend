'use strict';
import React from "react";
import ReactDOM from "react-dom";
import { validate, list_resume, str2bool } from "./Base";
import Resume from "./Resume";
import AlertComponent from "./Alert";
import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";
import ClearButton from "./ClearButton";
import DeleteButton from "./DeleteButton";

class ResumeMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resumeList: [],
            currentResumeId: parseInt(sessionStorage.getItem('currentResumeId')) || 0,
            currentResumeName: sessionStorage.getItem('currentResumeName') || 'Blank',
            alertContent: '',
        };
        this.setState = this.setState.bind(this);
        this.massUpdateState = this.massUpdateState.bind(this);
    }

    async componentDidMount() {
        let resume_list = await list_resume();
        this.setState({
            resumeList: resume_list
        })
    }

    componentDidUpdate() {
        if (Boolean(this.state.alertContent)) {
            setTimeout(() => this.setState({
                alertContent: '',
            }), 1000);
        }
    }

    massUpdateState(states) {
        this.setState(states);
    }

    render() {
        console.log('the states of ResumeMake:', this.state);
        return (
            <div id="resume_maker">
                <AlertComponent content={this.state.alertContent} isShow={this.state.alertShow} />
                <div className="row justify-content-center">
                    <div className="col">
                        <SaveButton onSubmit={this.massUpdateState} />
                    </div>
                    <div className="col">
                        <ClearButton onClick={this.massUpdateState} />
                    </div>
                    <div className="col">
                        <LoadButton onSelect={this.massUpdateState} list={this.state.resumeList} />
                    </div>
                    <div className="col">
                        <DeleteButton onSubmit={this.massUpdateState} id={this.state.currentResumeId} />
                    </div>
                </div>
                <a id="view_btn" className="btn btn-primary" href="/resume/">View your resumé</a>
                <Resume 
                key={this.state.currentResumeId} 
                name={this.state.currentResumeName} />
            </div>
        );
    }
}

ReactDOM.render(<ResumeMaker />, document.querySelector('#root'));