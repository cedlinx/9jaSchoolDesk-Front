import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./GuardianDetails.module.scss";
import Button from "@/components/Button/Button";
import {titleCase} from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import formatArrayList from "@/helpers/formatArrayList";
import formatDate from "@/helpers/formatDate";


const GuardianDetails = () => {
  
  const dispatch = useDispatch();
  const data = useSelector((state) => state.modalState.modalData);
  

  let getWardsArray =(data)=>{
    let wardArray = [];
    data.map((ward)=>{
      wardArray.push(`${ward.firstName} ${ward.lastName}`);
    }
    );
    return formatArrayList(wardArray);
  }; 

  return (
    <div className={cx(styles.guardianDetailsContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "guardianDetails" }))} icon="carbon:close-filled" color="white" />
      </div>
      
      <div className={cx(styles.body, "flexCol")}>

	  <div className={cx(styles.header)}>
          <p>Guardian Details</p>
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>FIRSTNAME</span><span className={cx(styles.value)}>{data?.firstName && titleCase(data?.firstName)}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>LASTNAME</span><span className={cx(styles.value)}>{data?.lastName && titleCase(data?.lastName)}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>EMAIL</span><span className={cx(styles.value)}>{data?.email}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>WARD(S)</span><span className={cx(styles.value)}>{Array.isArray(data?.wards) && data?.wards.length > 0 ? getWardsArray(data?.wards) : "There are no wards attached to this account"}</span>
        </div>
        {data?.phone && <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>PHONE</span><span className={cx(styles.value)}>{data?.phone}</span>
        </div>}
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>CREATED AT</span><span className={cx(styles.value)}>{formatDate(data?.created_at)}</span>
        </div>
        {/* <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>MINIMUM SCORE</span><span className={cx(styles.value)}>{data?.min_score}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>MAXIMUM SCORE</span><span className={cx(styles.value)}>{data?.max_score}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>WEIGHT</span><span className={cx(styles.value)}>{data?.weight}</span>
        </div> */}
		
        <Button onClick={()=>dispatch(showModal({ action: "hide", type: "guardianDetails" }))} title="OK" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
      </div> 
			
    </div>
  );
};

export default GuardianDetails;
