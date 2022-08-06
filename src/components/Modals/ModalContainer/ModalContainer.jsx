
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./ModalContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/redux/ModalState/ModalSlice";

const ModalContainer = ({ children, size = "md" }) => {
  // const {size="md"} = props;
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);


  // const [showModal, setShow] = useState(show);

  // const handleClose = () => setShow(false);

  const handleClose = () => {
    dispatch(showModal({ action: "hide" }));
  };

  return (
    <>
      <div className=''>
        <Modal
          show={modalState === "show" ? true : false}
          onHide={handleClose}
          scrollable={true}
          centered
          size={size}
          dialogClassName='generic-modal-wrapper'
        >
          {/* <Modal.Header className="generic-modal-header">
            <img onClick={() => handleClose("hide")} src={closeIcon} alt="" />
          </Modal.Header> */}
          <Modal.Body className='generic-modal-body' >
            {children}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ModalContainer;
