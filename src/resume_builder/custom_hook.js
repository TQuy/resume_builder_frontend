import { useRef, useEffect } from "react";
import _set from "lodash/fp/set";

export function useSectionList(name, state, initialContent, updater) {
  const { checked, number_subsection: subsectionQuantity, payload } = state;
  const sectionContent = getSectionDOMContent(
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

function getSectionDOMContent(sectionContent, displayQuantity, initialValue) {
  const availableQuantity = sectionContent.length;
  let newSectionContent;
  if (availableQuantity === 0) {
    newSectionContent = Array(displayQuantity).fill(initialValue);
  } else if (availableQuantity >= displayQuantity) {
    newSectionContent = sectionContent.slice(0, displayQuantity);
  } else {
    // when availableQuantity < displayQuantity
    const fillInContent = Array(displayQuantity - availableQuantity).fill(
      initialValue
    );
    newSectionContent = sectionContent.concat(fillInContent);
  }
  return newSectionContent;
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

  useEffect(() => {
    const textAreaObj = Detail.current;

    const updateHeight = () => {
      textAreaObj.style.height = 0;
      textAreaObj.style.height = `${Math.max(textAreaObj.scrollHeight, 45)}px`;
    };

    textAreaObj.addEventListener("input", updateHeight);

    return () => textAreaObj.removeEventListener("input", updateHeight);
  });

  return Detail;
}
