import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./KPIIndicatorDetails.module.scss";
import Button from "@/components/Button/Button";
import {titleCase} from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";


const KPIIndicatorDetails = () => {
  
  const dispatch = useDispatch();
  const data = useSelector((state) => state.modalState.modalData);

  return (
    <div className={cx(styles.KPIIndicatorDetailsContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "addPerformanceIndicator" }))} icon="carbon:close-filled" color="white" />
      </div>
      
      <div className={cx(styles.body, "flexCol")}>

	  <div className={cx(styles.header)}>
          <p>KPI Indicator Details</p>
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>NAME</span><span className={cx(styles.value)}>{data?.name && titleCase(data?.name)}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>CATEGORY</span><span className={cx(styles.value)}>{data?.category}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>TYPE</span><span className={cx(styles.value)}>{data?.type}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>MINIMUM SCORE</span><span className={cx(styles.value)}>{data?.min_score}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>MAXIMUM SCORE</span><span className={cx(styles.value)}>{data?.max_score}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>WEIGHT</span><span className={cx(styles.value)}>{data?.weight}</span>
        </div>
		
        <Button onClick={()=>dispatch(showModal({ action: "hide", type: "KPIIndicatorDetails" }))} title="OK" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
      </div> 
			
    </div>
  );
};

export default KPIIndicatorDetails;
