import React from 'react';

export default function ClearButton({ dispatch }) {

    return (
        <button type="button" className="btn btn-warning" onClick={() => dispatch({ "name": "all" })}>Blank</button>
    )
}