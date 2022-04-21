import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import cx from "classnames";
import styles from "./MenuBar.module.scss";
import Logo from "@/assets/images/Logo.svg";
import Button from "@/components/Button/Button";
import { Navbar, Nav, Dropdown, 
  NavDropdown} from "react-bootstrap";


const MenuBar = () => {

  const navigate = useNavigate();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={cx(styles.navbarContainer, "flexRow")}>
        <Navbar.Brand className={cx(styles.siteLogo )}> 		
          <Link to="/"><img src={Logo} alt="" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle className={cx(styles.navbarToggler)} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className={cx(styles.navbarCollapse)} id="responsive-navbar-nav" >
          <Nav className={cx(styles.primaryNavigation, "ms-auto")}>
            <Link to="/">Home</Link>
            <Link to="/student">Student</Link>
            <Link to="/parent">Parent</Link>
            <Link to="/teacher">Teacher</Link>
          </Nav>

          <div className={cx(styles.btnGroup)} >
            <Button onClick={()=>navigate("/signup")} title="Sign Up" borderRadiusType="fullyRounded" textColor="#fff"  bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />

            <Button onClick={()=>navigate("/login")} title="Sign In" borderRadiusType="fullyRounded" textColor="#D25B5D"  bgColor="#FFF" hoverBg="#D25B5D" hoverColor="#FFF" bordercolor="#D25B5D" />
          </div>
					

        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MenuBar;
