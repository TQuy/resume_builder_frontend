'use strict'; 
import React from 'react';
import { csrftoken, list_resume, removeRedundant } from './Base';

export default class SaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
        this.modalButton = React.createRef();
        this.closeButton = React.createRef();
        this.nameInput = React.createRef();

        this.handleClick = this.handleClick.bind(this);
        this.handleSubtmit = this.handleSubtmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        this.modal_btn = this.modalButton.current;
        this.close_btn = this.closeButton.current;
        this.name_input = this.nameInput.current;
    }

    handleClick() {
        this.name_input.focus();
    }

    handleInput(e) {
        if (e.keyCode === 13) {
            this.close_btn.click();
        }
        this.setState({
            name: e.target.value,
        })
    }

    async handleSubtmit() {
        try {
            // call save api
            let response = await fetch('/save_resume/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    content: removeRedundant(sessionStorage),
                })
            });
            response = await response.json();
            // show alert + reset the resume_id
            let preserve_data = {
                'currentResumeId': response['id'],
                'currentResumeName': response['name']
            };
            Object.entries(preserve_data).forEach( ([key, value]) => sessionStorage.setItem(key, value) );
            // Update LoadButton
            let resume_list = await list_resume();
            this.props.onSubmit(
                function() {
                    preserve_data['resumeList'] = resume_list;
                    preserve_data['alertContent'] = response['message'];
                    return preserve_data;
                }
            )
            // close the modal
            this.close_btn.click();
        } catch(error) {
            this.close_btn.click();
            this.props.onSubmit({
                alertContent: 'Error happen when saving resume'
            })
        }
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#saveModal" ref={this.modalButton} onClick={this.handleClick} >
                    Save Resume
                </button>

                <div className="modal fade" id="saveModal" tabIndex="-1" aria-labelledby="saveModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="saveModalLabel">Save Resume</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={this.closeButton}></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="resume_name" className="form-label">Name</label>
                                <input id="resume_name" type="text" className="form-control" onInput={this.handleInput} value={this.state.name} ref={this.nameInput} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.handleSubtmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}