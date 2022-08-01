import React from "react";
import {useLocation} from "react-router-dom";

import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./PriceCard.module.scss";
import circleIcon from "@/assets/icons/circle_icon.svg";
import filledCircle from "@/assets/icons/filled_circle.svg";
import filledCircleAlt from "@/assets/icons/filled_circle_alt.svg";
import Button from "@/components/Button/Button";
import { moneyFormat } from "@/helpers/moneyFormat";


const PriceCard = props => {
  const {benefitsArray, btnText, title, amount, currency} = props;

  const location = useLocation();
  const rootPath = location.pathname.split("/")[1];
    
  console.log(rootPath);

  return (

    <section className={cx(styles.priceCardContainer, "flexRow")}>
      <div section className={cx(styles.wrapper)}>
        <div style={{backgroundColor: title === "Premium" ? "#22467B" : "#F9F9F9", color: title === "Premium" ? "#fff" : "#22467B"}} className={cx(styles.benefitsHeader, "flexRow-left-centered")}>
          <img src={title === "Premium" ? filledCircle : filledCircleAlt} alt="icon" />
          <p className={cx(styles.title)}>{title} - {`${currency} ${moneyFormat(amount)}`}</p>
        </div>
									
        <div className={cx(styles.benefitsListWrapper, "row")}>
          {benefitsArray && benefitsArray.map((element, index)=>{
            return(
              <div className={cx(styles.listItemWrapper)} key={index}>
									
                <i><img src={circleIcon} alt="check-icon" /></i> <p className={cx(styles.listItem)}>{element}</p>
              </div>
            );
          })}
        </div>

        { title !== "Premium" ? <div className="flexRow-fully-centered" style={{marginTop: "2rem"}}><Button title={btnText} radiusType="fullyRounded" textColor="#22467B" bordercolor = "#22467B" bgColor="#fff" hoverBg="#22467B" hoverColor="#FFF"  /></div> 
					
          :
          <div className="flexRow-fully-centered" style={{marginTop: "2rem"}}><Button title={btnText} radiusType="fullyRounded" textColor="#FFF" bordercolor = "#FFF" bgColor="#22467B" hoverBg="#FFF" hoverColor="#22467B"  /></div> }

        {rootPath.toLowerCase() === "admin" && <div className={cx(styles.editPlanDiv, "flexRow")}>
          <p onClick={() => alert(title)}>Edit Plan</p>
        </div>}

      </div>
    </section>
  );
};

PriceCard.propTypes = {
    
};

export default PriceCard;