import { useRef, useEffect } from "react";
import _set from "lodash/fp/set";

export function useSectionList(name, state, initialContent, updater) {
  const { checked, number_subsection: subsectionQuantity, payload } = state;
  const sectionContent = getContentList(
    payload,
    subsectionQuantity,
    initialContent
  );
  const handleUpdateSubsection = (e, idx) => {
    const newPayload = _set([idx, e.target.name], e.target.value)(sectionContent);
    updater({ name: name, key: "payload", value: newPayload });
  };
  return [sectionContent, handleUpdateSubsection, checked];
}

function getContentList(sectionContent, displayQuantity, initialValue) {
  const availableQuantity = sectionContent.length;
  if (availableQuantity === 0) {
    return Array(displayQuantity).fill(initialValue);
  } else if (availableQuantity >= displayQuantity) {
    return sectionContent.slice(0, displayQuantity);
  } else {
    // when availableQuantity < displayQuantity
    const fillInContent = Array(displayQuantity - availableQuantity).fill(
      initialValue
    );
    return sectionContent.concat(fillInContent);
  }
}

export function useDetailRef() {
  const Detail = useRef(null);
  useEffect(() => {
    const autoReizeTextArea = (areaProps) => {
      areaProps.style.height = `${Math.max(areaProps.scrollHeight, 45)}px`;
      areaProps.style.overflowY = "hidden";
    };
    autoReizeTextArea(Detail.current);
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
