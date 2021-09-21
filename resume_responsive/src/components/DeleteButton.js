'use strict'; 
import React from 'react';
import { csrftoken, list_resume } from './Base';

export default class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.closeButton = React.createRef();
        this.handleSubtmit = this.handleSubtmit.bind(this);
    }

    componentDidMount() {
        this.close_btn = this.closeButton.current;
    }

    async handleSubtmit() {
        try {
            // clear all the session data
            sessionStorage.clear();
            let response = await fetch(`/delete_resume/${this.props.id}/`, {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            console.log(response);
            // enable alert + reload + reset resume_id
            let preserve_data = {
                'currentResumeId': 0,
                'currentResumeName': 'Blank',
            };
            Object.entries(preserve_data).forEach(([key, value]) => sessionStorage.setItem(key, value));
            // Update LoadButton
            let resume_list = await list_resume();
            console.log('resume_list', resume_list);
            this.props.onSubmit(
                function() {
                    preserve_data['resumeList'] = resume_list;
                    preserve_data['alertContent'] = response['message'];
                    return preserve_data;
                }
            )
            // clear sessionStorage data
            // close the modal
            this.close_btn.click();
        } catch(error) {
            this.close_btn.click();
            this.props.onSubmit({
                alertContent: 'Error happen when deleting resume'
            })
        }
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                    Delete Resume
                </button>

                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Delete Resume</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={this.closeButton}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure?
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-danger" onClick={this.handleSubtmit}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}