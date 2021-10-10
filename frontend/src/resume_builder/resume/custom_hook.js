import { useState, useRef, useEffect, useCallback } from "react";

function useDisplaySection(control_state, SubSec) {
    const [ display, number_subsection ] = Object.values(control_state);
    const list_of_subsec = Array(number_subsection).fill().map((_, i) => (
        <SubSec key={i.toString()} order={i} />
    ));
    return [ display, list_of_subsec ]
};

function useDisplayWithoutDetail(initial_state) {
    const [ state, setState ] = useState(initial_state);
    const handleChange = useCallback((e) => {
        setState({...state, [e.target.name]: e.target.value});
        sessionStorage.setItem(e.target.name, e.target.value);
        if (e.target.tagName === "TEXTAREA") {
            e.target.style.height = "auto";
            e.target.style.height = `${Math.max(e.target.scrollHeight, 45)}px`;
        }
    });
    return [ state, handleChange ]
}

function useDisplaySubSection(initial_state) {
    const Detail = useRef(null);
    useEffect(() => {
        Detail.current.style.height = `${Math.max(Detail.current.scrollHeight, 45)}px`;
        Detail.current.style.overflowY = "hidden";
    })
    const [ state, handleChange ] = useDisplayWithoutDetail(initial_state);
    return [ state, handleChange, Detail ]
};

export { useDisplaySection, useDisplayWithoutDetail, useDisplaySubSection };