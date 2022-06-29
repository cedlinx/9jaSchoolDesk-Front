import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import cx from "classnames";
import imageLoader from "@/assets/icons/loading.svg";
import styled from "styled-components";

const ButtonComponent = styled.button`
padding: 0.625rem 1.125rem;
  border: 0.5px solid;
  // font-family: KGCorneroftheSky, NunitoSans;
  font-size: 0.75rem;
  width: max-content;
  align-items: center;
  justify-content: center;
border-radius: ${props => props.borderRadiusValue};
line-height: 1;

input{
      margin: 0rem 0.375rem 0rem 0rem;
  }
  a{
      width: 100%;
  }
span{
      margin-right: 0rem;
      font-size: 1.25rem;
  }
&:hover{ 
  background-color: ${props => props.hoverBg} !important;; 
  color: ${props => props.hoverColor} !important; 
}

@media all and (min-width:991px){
  
    padding: 0.625rem 1rem;
    font-size: 1rem;
  }
}

@media all and (min-width:1200px){
  
  padding: 0.625rem 1.75rem;
      font-size: 1rem;
}
}
`;

const Button = props => {

  const {title, type="button", borderRadiusType, textColor, bgColor, bordercolor, routePath, checked, checkedBtn, icon, disabled = false, loading, onClick, hoverBg, hoverColor} = props;

  const borderRadiusValue =()=>{
    switch(borderRadiusType){
    case "lowRounded":
      return "0.75rem";
    case "mediumRounded":
      return "1rem";
    case "fullyRounded":
      return "1.5rem";
			
    default:
      return "0.25rem";
    }
  };

  return (	
    <ButtonComponent type onClick={onClick} disabled={disabled} className={cx( "flexRow"  )} style={{ color: `${textColor}`, backgroundColor: `${bgColor}`, borderColor: `${bordercolor}`, border: bordercolor ? "1px solid" : `1px solid ${bgColor}`, borderRadius: `${borderRadiusValue()}` }}>
      {loading ? ( <img
        src={imageLoader}
        height="18"
                   />) : (
        <>
          <span>{icon && icon}</span>
          {checkedBtn && <input checked={checked} type="checkbox" />}
          {title}
        </>
      )}
			
    </ButtonComponent>	
  );
};

Button.defaultProps = {
  borderRadiusType: "fullyRounded",
  title: "",
  textColor: "",
  bgColor: "",
  bordercolor: "",
  routePath: "#"   
};
Button.propTypes = {
  borderRadiusType: PropTypes.string,
  title: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,  
  bordercolor: PropTypes.string,
  routePath: PropTypes.string  
};

export default Button;


