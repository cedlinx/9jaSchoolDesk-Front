import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import cx from "classnames";
import styles from "./MenuBar.module.scss";
import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button/Button";
import { Navbar, Nav, Dropdown, 
  NavDropdown} from "react-bootstrap";


const MenuBar = () => {

  const handleClick=(e)=>{
  };
  
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={cx(styles.navbarContainer, "flexRow", "container")}>
        <Navbar.Brand className={cx(styles.siteLogo )}> 		
          <Link to="/"><img src={Logo} alt="" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle className={cx(styles.navbarToggler)} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className={cx(styles.navbarCollapse)} id="responsive-navbar-nav" >
          <Nav className={cx(styles.primaryNavigation)}>
            <Link onClick={(e) =>handleClick(e)} id="home" to="#">Home</Link>
            <Link onClick={(e) =>handleClick(e)} id="student" to="#">Student</Link>
            <Link onClick={(e) =>handleClick(e)} id="guardian" to="#">Guardian</Link>
            <Link onClick={(e) =>handleClick(e)} id="teacher" to="#">Teacher</Link>
          </Nav>				

        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MenuBar;
