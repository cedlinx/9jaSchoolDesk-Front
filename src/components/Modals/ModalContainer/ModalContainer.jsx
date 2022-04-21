
import React from "react";
import { Modal } from "react-bootstrap";
import "./ModalContainer.scss";
import {useDispatch} from "react-redux";
import { showModal } from "@/redux/ModalState/modalState.action";
import closeIcon from "@/assets/icons/close-icon.svg";

const ModalContainer = ({children}) => {

  const dispatch = useDispatch();

  const handleClose = (data) => {
    dispatch(showModal({action: data}));
  };

  return (
    <>
      <div className=''>
        <Modal
          show
          onHide={handleClose}
          scrollable={true}
          centered
          size='md'
          dialogClassName='generic-modal-wrapper'
        >
          <Modal.Body className='generic-modal-body' >
            {children}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ModalContainer;
