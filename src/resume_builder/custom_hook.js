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
    const newPayload = _set(
      [idx, e.target.name],
      e.target.value
    )(sectionContent);
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
    const setInitialHeight = (textAreaProps) => {
      textAreaProps.style.height = `${Math.max(
        textAreaProps.scrollHeight,
        45
      )}px`;
      textAreaProps.style.overflowY = "hidden";
    };
    setInitialHeight(Detail.current);
  }, []);

  return Detail;
}

export function handleChange(e, index, dispatch) {
  const updateHeight = (target) => {
    if (target.tagName === "TEXTAREA") {
      target.style.height = 0;
      target.style.height = `${Math.max(e.target.scrollHeight, 45)}px`;
    }
  };
  updateHeight(e.target);
  dispatch(e, index);
}
