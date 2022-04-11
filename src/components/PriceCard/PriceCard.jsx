import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./PriceCard.module.scss";
import checkIcon from "@/assets/icons/check-icon.svg";
import Button from "@/components/Button/Button";

const PriceCard = props => {
	const {benefitsHeader, amount, benefitsArray, btnText, pricingPage, title} = props;
	return (

		<section className={pricingPage && pricingPage ? cx(styles.container, styles.pricingPageWidth, "flexRow") : cx(styles.container, "flexRow")}>

			<div section className={cx(styles.wrapper)}>
				<div className={cx(styles.topSection)}>
					<div className={cx("flexCol-fully-centered", pricingPage ? cx(styles.pricingCardHeader) : null)}>
						<p className={cx(styles.title)}>{title}</p>
						<p className={cx(styles.amount)}>NGN {amount}</p>
					</div>
					

					{benefitsHeader ?<p className={cx(styles.benefitsHeader)}>Benefit Includes</p> : null}
					
					<div className={cx(styles.benefitsListWrapper, "row")}>
						{benefitsArray && benefitsArray.map((element, index)=>{
							return(
								<div className={cx(styles.listItemWrapper, "col-xs-12", !pricingPage ? "col-md-6" : "col-md-12")} key={index}>
									
									<i><img src={checkIcon} alt="check-icon" /></i> <p className={cx(styles.listItem)}>{element}</p>
								</div>
							);
						})}
					</div>

					{pricingPage && btnText && <div className="flexRow-fully-centered"><Button title={btnText} radiusType="fullyRounded" textColor="#2C0085" bordercolor = "#2C0085" bgColor="#fff" hoverBg="#2C0085" hoverColor="#FFF" /></div> }
				</div>
				{ !pricingPage && btnText && <div className="flexRow-fully-centered" style={{marginTop: "2rem"}}><Button title={btnText} radiusType="fullyRounded" textColor="#2C0085" bordercolor = "#2C0085" bgColor="#fff" hoverBg="#2C0085" hoverColor="#FFF"  /></div> }

			</div>
		</section>
	);
};

PriceCard.propTypes = {
    
};

export default PriceCard;