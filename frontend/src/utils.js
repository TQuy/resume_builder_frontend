import { Modal } from "bootstrap";

export const handleShowHideModal = (type, modalRef) => {
  // show or hide modal
  if (modalRef.current) {
    const modalController = Modal.getOrCreateInstance(modalRef.current);
    type === "show" ? modalController.show() : modalController.hide();
  }
};
