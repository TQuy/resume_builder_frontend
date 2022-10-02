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
