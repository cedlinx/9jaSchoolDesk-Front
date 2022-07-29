import React, {useState, useEffect} from "react";
import cx from "classnames";
import styles from "./PerformanceIndicator.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";


const PerformanceIndicator = () => {
  const dispatch = useDispatch();
  const performanceIndicatorData = useSelector((state) => state?.proprietor?.getAllKPIsData?.kpis);

  const handleDelete = (data) =>{
    dispatch(showModal({ action: "show", type: "deleteIndicator", modalData: data}));
  };

  const handleModify = (data) =>{
    dispatch(showModal({ action: "show", type: "modifyKPIIndicator", modalData: data}));
  };

  const showDetails = (data) =>{
    dispatch(showModal({ action: "show", type: "KPIIndicatorDetails", modalData: data}));
  };

  return (
    <div className={cx(styles.settingsTabItemContainer)}>
      <div className={cx(styles.panelContent, "flexCol")}>
        <div className={cx(styles.header)}>
          <h3>Performance Indicators</h3>
          <small>Create Performance Indicators for students</small>
        </div>

        <div className={cx(styles.body)}>
          {performanceIndicatorData && performanceIndicatorData.map((indicator, index) => {
            return (
              <div key={index} className={cx(styles.sectionContainer, "flexCol")}>
                <div onClick={() =>showDetails(indicator)}className={cx(styles.indicatorWrapper, "flexRow")} >
                  <span className={cx(styles.iconSpan)}><img src={indicator.avatar} alt="img" /></span><span className={cx(styles.value)}>{indicator.name}</span>
                </div>
                <div className={cx(styles.btnGroup, "flexRow-space-between")}>
                  <div onClick={()=>handleModify(indicator)}  className={cx(styles.wrapper, "flexRow")}>
                    <Icon icon="clarity:note-edit-line" />
                    <span>
                      Modify
                    </span>
                  </div>

                  <div onClick={()=>handleDelete(indicator.id)} className={cx(styles.wrapper, "flexRow")}>
                    <Icon icon="fluent:delete-24-filled" color="#d25b5d" />
                    <span>
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            );
          }
          )}
        </div>

        <div className={cx(styles.footer, "flexRow")}>
          <Button onClick={() => dispatch(showModal({action: "show", type: "addPerformanceIndicator"}))} type title="Add Indicator" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>
      </div>

    </div>
  );
};

export default PerformanceIndicator;