'use strict';
import React from 'react';

export default class LoadButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
    }

    async handleLoad(resume_id) {
        try {
            // clear session data
            sessionStorage.clear();
            // call load_resume api
            let response = await fetch(`/load_resume/${resume_id}/`);
            response = await response.json();
            let load_data = response['content'];
            // set currentResumeId
            load_data['currentResumeId'] = parseInt(resume_id);
            load_data['currentResumeName'] = response['name'];
            // set sessionStorage data, only load the one with Boolen(value) == true
            Object.entries(load_data).forEach(([key, value]) => value && sessionStorage.setItem(key, value) );
            // enable alert and reload
            this.props.onSelect(function() {
                load_data['alertContent'] = response['message'];
                return load_data;
            });
        } catch(error) {
            this.props.onSelect(function() {
                return {
                    alertContent: 'Error happened when trying to load data.'
                }
            })
        }
    }

    render() {
        let resume_list = this.props.list.map((i) => {
            return <SavedResume key={i['name']} id={i['id']} name={i['name']} onClick={this.handleLoad} />;
        });
        return (
            <div className="dropdown">
                <button className="btn btn-info dropdown-toggle" type="button" id="load_btn" data-bs-toggle="dropdown" aria-expanded="false">
                    Load Resume
                </button>
                <ul className="dropdown-menu" aria-labelledby="load_btn">
                    {resume_list}
                </ul>
            </div>
        )
    }
}

class SavedResume extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let resume_id = this.props.id;
        let resume_name = this.props.name;
        return (
            <li>
                <a className="dropdown-item" onClick={(e) => this.props.onClick(resume_id, e)}>
                    {resume_name}
                </a>
            </li>
        )
    }
}