import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import userIcon from "@/assets/icons/user-icon.svg";
import cx from "classnames";
import styles from "./UserDetails.module.scss";
import Button from "@/components/Button/Button";
import {titleCase} from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/modalState.action";
import {getAllUsers, getAllAdminUsers} from "@/redux/User/user.action";
import closeIcon from "@/assets/icons/close-icon.svg";

const UserDetailsModal = props => {
	const {data, dispatchAction} = props;
	
	const dispatch = useDispatch();

	const handleClick=(dispatchActionData) => {
		console.log("got herere");
		dispatch(showModal({action: "hide"}));
		dispatchActionData === "usersList" ? dispatch(getAllUsers()) : null;
		dispatchActionData === "adminUsersList" ? dispatch(getAllAdminUsers()) : null;
	};

	return (
		<ModalWrapper className={cx(styles.modalWrapper, "flexCol-align-center")}>
			{data ? 
				<>
					{/* <div className={cx("modalHeader")}>
						<img onClick={()=>handleClick(dispatchAction)} src={closeIcon} alt="close-icon" />
					</div> */}
					<img src={userIcon} alt="usericon" style={{marginBottom: "1.5rem"}} />
					<h6>USER INFORMATION</h6>
					<div className={cx(styles.modalItem, "flexRow-space-between")}>
						<span className={cx(styles.title)}>USER ID</span><span className={cx(styles.value)}>{data?.id && data?.id}</span>
					</div>
					<div className={cx(styles.modalItem, "flexRow-space-between")}>
						<span className={cx(styles.title)}>DATE CREATED</span><span className={cx(styles.value)}>{data?.created_at}</span>
					</div>
					<div className={cx(styles.modalItem, "flexRow-space-between")}>
						<span className={cx(styles.title)}>NAME</span><span className={cx(styles.value)}>{data?.name}</span>
					</div>
					<div className={cx(styles.modalItem, "flexRow-space-between")}>
						<span className={cx(styles.title)}>EMAIL ADDRESS</span><span className={cx(styles.value)}>{data?.email}</span>
					</div>
					<div className={cx(styles.modalItem, "flexRow-space-between")}>
						<span className={cx(styles.title)}>USER TYPE</span><span className={cx(styles.value)}>{data?.group_id}</span>
					</div>
					<div className={cx(styles.modalItem, "flexRow-space-between")}>
						<span className={cx(styles.title)}>PHONE NUMBER</span><span className={cx(styles.value)}>{data?.phone}</span>
					</div>
				
					<Button onClick={() => handleClick()} title="Ok" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#2C0085" />
				
					


				</> : <div>An Error Occured, Please Try Again</div>}
			

		</ModalWrapper>
	);
};

UserDetailsModal.propTypes = {

};

export default UserDetailsModal;


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
		border-bottom: 1px solid #2C0085;

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
			border-bottom: 1px solid #2C0085;

			span{
				font-size: 0.875rem;
			}
		}
		button{
			margin-top: 2rem;
		}
	}
`;