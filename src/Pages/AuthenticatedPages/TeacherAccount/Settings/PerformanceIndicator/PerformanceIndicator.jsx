import React, { useState, useEffect } from "react";
import cx from "classnames";
import styles from "./PerformanceIndicator.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import useGetClassID from "@/utils/useGetClassID";


const PerformanceIndicator = () => {
  const dispatch = useDispatch();
  const classID = useGetClassID();

  const performanceIndicatorData = useSelector((state) => state?.teacher?.viewKPIForClassData?.kpis);
  const loading = useSelector((state) => state?.teacher?.loading);

  const handleDelete = (data) => {
    dispatch(showModal({ action: "show", type: "deleteIndicator", modalData: data }));
  };

  const handleModify = (data) => {
    dispatch(showModal({ action: "show", type: "modifyKPIIndicator", modalData: data }));
  };

  const showDetails = (data) => {
    dispatch(showModal({ action: "show", type: "KPIIndicatorDetails", modalData: data }));
  };

  return (
    <div className={cx(styles.settingsTabItemContainer)}>
      <div className={cx(styles.panelContent, "flexCol")}>
        <div className={cx(styles.header)}>
          <h3>Behaviour Monitor</h3>
          {classID && <small>Create Behaviour Monitor for students</small>}
        </div>

        { classID ? 
          <>
            <div className={cx(styles.body)}>
              {loading ? <TableSkeleton /> :
                Array.isArray(performanceIndicatorData) && performanceIndicatorData.map((indicator, index) => {
                  return (
                    <div key={index} className={cx(styles.sectionContainer, "flexCol")}>
                      <div onClick={() => showDetails(indicator)} className={cx(styles.indicatorWrapper, "flexRow")} >
                        <span className={cx(styles.iconSpan)}><img src={indicator.avatar} alt="img" /></span><span className={cx(styles.value)}>{indicator.name}</span>
                      </div>
                      <div className={cx(styles.btnGroup, "flexRow-space-between")}>
                        <div onClick={() => handleModify(indicator)} className={cx(styles.wrapper, "flexRow")}>
                          <Icon icon="clarity:note-edit-line" />
                          <span>
                        Modify
                          </span>
                        </div>

                        <div onClick={() => handleDelete(indicator.id)} className={cx(styles.wrapper, "flexRow")}>
                          <Icon icon="fluent:delete-24-filled" color="#d25b5d" />
                          <span>
                        Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                )
              }
            </div>
          </>
          :
          <div className={cx(styles.noDataDiv)}>
            <p>You have no class assigned to you. You can only create Indicators when you have at least one (1) class assigned to you. Kindly contact your administrator.</p>
          </div>

        }
     

        {classID &&  <div className={cx(styles.footer, "flexRow")}>
          <Button onClick={() => dispatch(showModal({ action: "show", type: "addPerformanceIndicator"}))} type title="Add Indicator" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
        </div>}
      </div>

    </div>
  );
};

export default PerformanceIndicator;