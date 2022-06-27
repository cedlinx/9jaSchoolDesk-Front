import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import cx from "classnames";
import styles from "./PaymentDetailsModal.module.scss";
import Button from "@/components/Button/Button";
import {titleCase} from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";

const PaymentDetailsModal = props => {
  const {data} = props;
  const dispatch = useDispatch();

  return (
    <ModalWrapper className={cx(styles.modalWrapper, "flexCol-align-center")}>
      {data ? 
        <>
          <img src={successCheckIcon} alt="" />
          <p>Successful</p>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>PAYMENT</span><span className={cx(styles.value)}>{data?.id && titleCase(data?.id)}</span>
          </div>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>PAYMENT DESCRIPTION</span><span className={cx(styles.value)}>{data?.description}</span>
          </div>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>PAYMENT ID</span><span className={cx(styles.value)}>{data?.assetid}</span>
          </div>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>SKYDAH ID</span><span className={cx(styles.value)}>{data?.skydahid}</span>
          </div>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>CREATED</span><span className={cx(styles.value)}>{data?.created_at}</span>
          </div>
          <Button onClick={() => dispatch(showModal("hide"))} title="OK" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
        </> : <div>An Error Occured, Please Try Again</div>}
			

    </ModalWrapper>
  );
};

PaymentDetailsModal.propTypes = {

};

export default PaymentDetailsModal;


const ModalWrapper = styled.div`
	width: 100%;
	padding: 0rem 0rem;

	img{
		width: 6rem;
	}
	div{
		margin: 0.5rem 0rem;
		border-bottom: 1px solid #D25B5D;

		span{
			font-size: 0.75rem;
		}
	}
	
	button{
		margin-top: 2rem;
	}

	@media all and (min-width: 768px) {
		padding: 0rem 0.5rem;

		img{
			width: 6rem;
		}
		div{
			margin: 0.75rem 0rem;
			border-bottom: 1px solid #D25B5D;

			span{
				font-size: 0.875rem;
			}
		}
		button{
			margin-top: 2rem;
		}
	}
`;