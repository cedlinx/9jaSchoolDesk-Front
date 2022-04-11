import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./PageHeader.module.scss";

const PageHeader = ({ headerTitle, bgImage, headerCaption, btnOneText, btnTwoText, btnThreeText, btnOneTextColor, hoverBgOne, hoverColorOne, btnTwoTextColor, btnThreeTextColor, btnOneBgColor, btnTwoBgColor, btnThreeBgColor, btnOneBorderColor, btnTwoBorderColor, btnThreeBorderColor, btnOnePath, btnTwoPath, btnThreePath, lightTheme, darkTheme, alignment, hoverBgTwo, hoverColorTwo,  hoverColorThree, hoverBgThree }) => {

	const navigate = useNavigate();

	return (
		<div style={{ backgroundImage: `url(${bgImage})`, display: "flex", flexDirection: "column", alignItems: `${alignment}`}} className={cx(styles.container, "flexColumn")}>

			<div className={alignment === "left" && lightTheme ? cx(styles.leftAligned) : alignment === "left" && darkTheme ? cx(styles.leftAligned , "white-text") : cx(styles.centerAligned)} >
				<h1>{headerTitle}</h1>
				<p className="main-caption">{headerCaption}</p>

				<div className={cx(styles.btnDiv, "flexRow")}>
					{btnOneText ? <Button hoverBg={hoverBgOne} hoverColor={hoverColorOne} onClick={()=>navigate(`${btnOnePath}`)} title={btnOneText} radiusType="fullyRounded" textColor={btnOneTextColor} bgColor={btnOneBgColor} bordercolor={btnOneBorderColor} /> : null}
					{btnTwoText ? <Button hoverBg={hoverBgTwo} hoverColor={hoverColorTwo} onClick={()=>navigate(`${btnTwoPath}`)} title={btnTwoText} radiusType="fullyRounded" textColor={btnTwoTextColor} bgColor={btnTwoBgColor} bordercolor={btnTwoBorderColor} />  : null}
					{btnThreeText ? <Button hoverBg={hoverBgThree} hoverColor={hoverColorThree} onClick={()=>navigate(`${btnThreePath}`)} title={btnThreeText} radiusType="fullyRounded" textColor={btnThreeTextColor} bgColor={btnThreeBgColor} bordercolor={btnThreeBorderColor} /> : null} 
				</div>
			</div>
				
			
		</div>
	);
};

export default PageHeader;
