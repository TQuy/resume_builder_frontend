import React from "react/cjs/react.development";

export default function LoadButton({ setCurrentResume, resume_list, dispatch }) {
    console.log('resume_list', resume_list);
    const list_of_resumes = resume_list.map((i) => {
        return <SavedResume 
                key={i.name} 
                resume_id={i.id} 
                resume_name={i.name} 
                dispatch={dispatch}
                setCurrentResume={setCurrentResume}
                />;
    });

    return (
        <div className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" id="load_btn" data-bs-toggle="dropdown" aria-expanded="false">
                Load
            </button>
            <ul className="dropdown-menu" aria-labelledby="load_btn">
                {list_of_resumes}
            </ul>
        </div>
    )
}

function SavedResume({ setCurrentResume, resume_id, resume_name, dispatch }) {
    const handleClick = (resume_id) => {
        console.log('resume_id', resume_id);
        fetch(`http://127.0.0.1:8000/resume/${resume_id}/`, {
            method: 'GET',
            headers: {'Authorization': 'Token ac8351a89f512010e0b36591e522cfa095e39f81'},
        }).then(
            response => response.json()
        ).then(data => {
            console.log('content', data['content']);
            dispatch({ 'name': 'load', 'value': data['content'] });
            setCurrentResume({ 'id': resume_id, 'name': resume_name });
        }).catch(error => alert(error))
    }
    return (
        <li>
            <button className="dropdown-item" onClick={() => handleClick(resume_id)}>
                {resume_name}
            </button>
        </li>
    )
}