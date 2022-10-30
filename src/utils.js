import { Modal } from "bootstrap";

export function handleShowHideModal(type, modalRef) {
  // show or hide modal
  if (modalRef.current) {
    const modalController = Modal.getOrCreateInstance(modalRef.current);
    type === "show" ? modalController.show() : modalController.hide();
  }
}

export function removeRedundancy(obj) {
  const compactObj = {};
  Object.entries(obj).forEach(([key, section]) => {
    compactObj[key] = {
      ...section,
      payload: section.payload.slice(0, section.number_subsection),
    };
  });
  return compactObj;
}
