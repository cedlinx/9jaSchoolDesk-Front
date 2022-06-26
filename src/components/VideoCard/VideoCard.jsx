import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./VideoCard.module.scss";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";

const VideoCard = ({ productDetails, teacherSection, studentSection=true }) => {
  const { name, price, images, tag } = productDetails;

  let shortenDate=(value)=>{
    let date = new Date(value);
    return date.toDateString();
  };



  return (

    <section className={cx(styles.videoCardContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.imageWrapper)}>
          <img src={images && images[0]} alt="img" />
        </div>
      </div>
      <div className={cx(styles.body, "flexCol")}>
        <div className={cx(styles.lessonDetails, "flexRow-space-between")}>
          <p>
            <span className={cx(styles.title)}>Title</span>
            {studentSection && 
            <>
              <Icon icon="ci:dot-01-xs" color="#828282" width="12" />
              <small>Subject</small>
            </>
            }
          </p>
          <small className={cx(styles.duration)}>{price}</small>
        </div>
        {studentSection &&  <div className={cx(styles.tutorDetails, "flexRow-space-between")}>
          <div className={cx(styles.imageDiv)}>
            <img src={images && images[0]} alt="" />
          </div>
          <small>{name}</small>
          <Icon icon="ci:play-circle-filled" color="#d25b5d" width="32" height="32"  />
        </div>}

        {teacherSection &&  <div className={cx(styles.tutorDetails, "flexRow-space-between")}>
          <p>Uploaded - {shortenDate(new Date())}</p>
        </div>}

      </div>

    </section>
  );
};

VideoCard.propTypes = {

};

export default VideoCard;