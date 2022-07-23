import React from "react";
import cx from "classnames";
import styles from "./PerformanceIndicator.module.scss";
import { useDispatch } from "react-redux";

import {performanceIndicatorData} from "@/helpers/sampleData";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";

const PerformanceIndicator = () => {

  const dispatch = useDispatch();



  return (
    <div className={cx(styles.settingsTabItemContainer)}>
      <div className={cx(styles.panelContent, "flexCol")}>
        <div className={cx(styles.header)}>
          <h3>Performance Indicators</h3>
          <small>Create Performance Indicators for students</small>
        </div>

        <div className={cx(styles.body)}>
          {performanceIndicatorData && performanceIndicatorData.map((item, index) => {
            return (
              <div className={cx(styles.indicatorWrapper, "flexRow")} key={index}>
                <span className={cx(styles.iconSpan)}><img src={item.imageUrl} alt="img" /></span><span className={cx(styles.value)}>{item.name}</span>
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