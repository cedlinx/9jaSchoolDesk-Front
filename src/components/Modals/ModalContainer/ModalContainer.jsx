
import React from "react";
import { Modal } from "react-bootstrap";
import "./ModalContainer.scss";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/ModalState/ModalSlice";
import closeIcon from "@/assets/icons/closeIcon.svg";

const ModalContainer = ({ children, size="md"}) => {
  // const {size="md"} = props;
  const dispatch = useDispatch();

  const handleClose = (data) => {
    dispatch(showModal({ action: data }));
  };

  return (
    <>
      <div className=''>
        <Modal
          show
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
