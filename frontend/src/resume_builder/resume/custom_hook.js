import { useState } from "react";

export function useDisplaySection(control_state, initial_section_state, SubSection) {
    const [ state, setState ] = useState(initial_section_state);
    console.log('state', state);
    const [ display, number_subsection ] = Object.values(control_state);
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
        sessionStorage.setItem(e.target.name, e.target.value);
    };

    const list_of_subsec = Array(number_subsection).fill().map((_, i) => (
        <SubSection key={i.toString()} order={i} state={state} onChange={handleChange} />
    ));
    return [ display, list_of_subsec ]
}