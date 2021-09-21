'use strict';
import React from 'react';

export default class ClearButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // clear session data
        sessionStorage.clear();
        // enable alert, and reset currentResumeId
        let preserve_data = {};
        preserve_data['currentResumeId'] = 0;
        preserve_data['currentResumeName'] = 'Blank';
        Object.entries(preserve_data).forEach(([key, value]) => sessionStorage.setItem(key, value));
        this.props.onClick(function() {
            preserve_data['alertContent'] = 'Wait for it.';
            return preserve_data;
        });
    }

    render() {
        return (
            <div>
                <button className="btn btn-warning" onClick={this.handleClick}>Blank Resume</button>
            </div>
        )
    }
}