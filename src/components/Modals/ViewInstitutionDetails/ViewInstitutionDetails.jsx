import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./ViewInstitutionDetails.module.scss";
import Button from "@/components/Button/Button";
import { titleCase, initialsCase } from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import formatArrayList from "@/helpers/formatArrayList";
import formatDate from "@/helpers/formatDate";


const ViewInstitutionDetails = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.modalState.modalData);
  console.log(data);

  const getSubjectList = (data) => {
    let subjectList = [];
    data?.forEach((subject) => {
      subjectList.push(subject.subject);
    });
    return formatArrayList(subjectList);
  };

  return (
    <div className={cx(styles.ViewInstitutionDetailsContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "addPerformanceIndicator" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.header)}>
          <p>Institution Details</p>
        </div>

        <div className={cx(styles.modalItem, styles.imageDiv)}>
          {data?.logo && 
            <img style={{borderRadius: "50%", width: "7.5rem"}} src={data?.logo} alt="img" />
          }
        </div>

        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>NAME</span><span className={cx(styles.value)}>{data?.name && (data?.name)}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>EMAIL</span><span className={cx(styles.value)}>{data?.email}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>ADDRESS</span><span className={cx(styles.value)}>{data?.address}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>PHONE NUMBER</span><span className={cx(styles.value)}>{data?.phone}</span>
        </div>
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>WEBSITE</span><span className={cx(styles.value)}><a href={data?.website} target="_blank" rel="noreferrer">{data?.website}</a></span>
        </div>
        {data?.youtube && <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>YOUTUBE</span><span className={cx(styles.value)}><a href={data?.youtube} target="_blank" rel="noreferrer">{data?.youtube}</a></span>
        </div>}
        {data?.facebook && <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>YOUTUBE</span><span className={cx(styles.value)}><a href={data?.facebook} target="_blank" rel="noreferrer">{data?.facebook}</a></span>
        </div>}
        {data?.twitter && <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>YOUTUBE</span><span className={cx(styles.value)}><a href={data?.twitter} target="_blank" rel="noreferrer">{data?.twitter}</a></span>
        </div>}
        <div className={cx(styles.modalItem)}>
          <span className={cx(styles.title)}>CREATED AT</span><span className={cx(styles.value)}>{formatDate(data?.created_at)}</span>
        </div>

        <Button onClick={() => dispatch(showModal({ action: "hide", type: "ViewInstitutionDetails" }))} title="OK" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
      </div>

    </div>
  );
};

export default ViewInstitutionDetails;
