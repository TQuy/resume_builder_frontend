'use strict';
import React from "react";
export default class AlertComponent extends React.Component {
    render() {
        return (
            <div id="alert">
                {Boolean(this.props.content) &&
                    <div className="alert alert-primary" role="alert">
                        {this.props.content}
                    </div>
                }
            </div>
        )
    }
}