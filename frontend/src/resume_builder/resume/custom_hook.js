import { useState } from "react";

function useDisplaySection(control_state, SubSec) {
    const [ display, number_subsection ] = Object.values(control_state);
    const list_of_subsec = Array(number_subsection).fill().map((_, i) => (
        <SubSec key={i.toString()} order={i} />
    ));
    return [ display, list_of_subsec ]
};

function useDisplaySubSection(initial_state) {
    console.log(initial_state);
    const [ state, setState ] = useState(initial_state);
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
        sessionStorage.setItem(e.target.name, e.target.value);
    };
    return [ state, handleChange ]
};

export { useDisplaySection, useDisplaySubSection };