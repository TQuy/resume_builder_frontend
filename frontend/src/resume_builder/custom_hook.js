import { useRef, useEffect } from "react";

export function useSectionList(name, control_state, initial_content, dispatch) {
  const { checked, number_subsection, payload } = control_state;
  let content_list;
  let empty_list;
  if (payload.length === 0) {
    content_list = Array(number_subsection).fill(initial_content);
  } else if (payload.length >= number_subsection) {
    content_list = payload.slice(0, number_subsection);
  } else {
    // when content.length < number_subsection
    empty_list = Array(number_subsection - payload.length).fill(
      initial_content
    );
    content_list = payload.concat(empty_list);
  }
  const handleChange = (e, index) => {
    const new_payload = content_list.slice(0);
    const new_content = {
      ...new_payload[index],
      [e.target.name]: e.target.value,
    };
    new_payload[index] = new_content;
    dispatch({ name: name, key: "payload", value: new_payload });
  };
  return [content_list, handleChange, checked];
}

export function useDetailRef() {
  const Detail = useRef(null);
  useEffect(() => {
    Detail.current.style.height = `${Math.max(
      Detail.current.scrollHeight,
      45
    )}px`;
    Detail.current.style.overflowY = "hidden";
  });
  return Detail;
}

export function handleChange(e, index, dispatch) {
  if (e.target.tagName === "TEXTAREA") {
    // adjust textarea height
    e.target.style.height = "auto";
    e.target.style.height = `${Math.max(e.target.scrollHeight, 45)}px`;
  }
  dispatch(e, index);
}
