import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
import cx from "classnames";
import styles from "./VerifyAssetSuccess.module.scss";
import Button from "@/components/Button/Button";
import {titleCase} from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { assetsList } from "@/redux/Assets/assets.action";
import closeIcon from "@/assets/icons/close-icon.svg";

const VerifyAssetSuccess = props => {
  const {data, dispatchAction} = props;
	
  const dispatch = useDispatch();

  const handleClick=(dispatchActionData) => {
    dispatch(showModal({action: "hide"}));
    dispatchActionData === "assetsList" ? dispatch(assetsList()) : null;
  };

  return (
    <ModalWrapper className={cx(styles.modalWrapper, "flexCol-align-center")}>
      {data ? 
        <>
          <div className={cx("modalHeader")}>
            <img onClick={()=>handleClick(dispatchAction)} src={closeIcon} alt="close-icon" />
          </div>
          <img src={successCheckIcon} alt="" />
          <p>Successful</p>

          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>OWNER NAME</span><span className={cx(styles.value)}>{data?.user?.name && titleCase(data?.user?.name)}</span>
          </div>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>ASSET</span><span className={cx(styles.value)}>{data?.name && titleCase(data?.name)}</span>
          </div>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>DESCRIPTION</span><span className={cx(styles.value)}>{data?.description}</span>
          </div>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>SKYDAH ID</span><span className={cx(styles.value)}>{data?.skydahid}</span>
          </div>
          <div className={cx(styles.modalItem, "flexRow-space-between")}>
            <span className={cx(styles.title)}>STATUS</span><span className={cx(styles.value)}>{data?.sos ? "Stolen" : "Not Stolen"}</span>
          </div>
          <Button onClick={() => handleClick(dispatchAction)} title="Verify another asset" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
        </> : <div>An Error Occured, Please Try Again</div>}
			

    </ModalWrapper>
  );
};

VerifyAssetSuccess.propTypes = {

};

export default VerifyAssetSuccess;


const ModalWrapper = styled.div`
	width: 100%;
	padding: 0rem 0rem;

	.modalHeader{
		width: 100%;
		display: flex;
		justify-content: flex-end;
		border: none;

		img{
			width: 1rem;
		}
	}

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