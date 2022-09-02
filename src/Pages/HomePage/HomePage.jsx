import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer/PageContainer";
import Testimonials from "@/components/Testimonials/Testimonials";
import cx from "classnames";
import styles from "./HomePage.module.scss";
import menuBarStyles from "./MenuBar.module.scss";
import { Card } from "react-bootstrap";
// import heroImage from "@/assets/images/hero-image.png";
import Button from "@/components/Button/Button";
import MenuBar from "@/components/MenuBar/MenuBar";
import { Icon } from "@iconify/react";
import PriceCard from "@/components/PriceCard/PriceCard";
import TopDivWave from "@/components/WaveSvg/TopDivWave";
import BottomDivWave from "@/components/WaveSvg/BottomDivWave";

import {
  Navbar, Nav, Dropdown,
  NavDropdown
} from "react-bootstrap";
import Logo from "@/assets/images/logo.png";

import studentImage from "@/assets/images/studentImage.png";
import teacherImage from "@/assets/images/teacherImage.png";
import guardiansImage from "@/assets/images/parentsImage.png";
import ruler from "@/assets/images/ruler.png";
import book from "@/assets/images/book.png";
import pencil from "@/assets/images/pencil.png";
import idea from "@/assets/images/idea.png";
import curvedHamburger from "@/assets/icons/curved-hamburger.svg";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";

import circleIcon from "@/assets/icons/circle_icon.svg";
import PricingModule from "@/components/PricingModule/PricingModule";


const HomePage = () => {
  const navigate = useNavigate();
  const studentsRef = useRef();
  const guardiansRef = useRef();
  const teachersRef = useRef();

  const gotoSection = (value) => {
    switch (value.target.id) {
    case "student":
      studentsRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    case "guardian":
      guardiansRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    case "teacher":
      teachersRef.current.scrollIntoView({ behavior: "smooth" });
      break;
    default:
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    }
  };


  return (
    <PageContainer showHeader={false}>

      <Navbar collapseOnSelect expand="lg" className={cx(menuBarStyles.navbarContainer, "flexRow")}>
        <Navbar.Brand className={cx(menuBarStyles.siteLogo)}>
          <Link to="/"><img src={Logo} alt="" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle className={cx(menuBarStyles.navbarToggler)} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className={cx(menuBarStyles.navbarCollapse)} id="responsive-navbar-nav" >
          <Nav className={cx(menuBarStyles.primaryNavigation)}>
            <Link onClick={(e) => gotoSection(e)} id="home" to="#">Home</Link>
            <Link onClick={(e) => gotoSection(e)} id="student" to="#">Student</Link>
            <Link onClick={(e) => gotoSection(e)} id="guardian" to="#">Guardian</Link>
            <Link onClick={(e) => gotoSection(e)} id="teacher" to="#">Teacher</Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>

      <div className={cx(styles.homepageContainer)}>

        <div className={cx(styles.heroWrapper)}>

          <img src={pencil} className={cx(styles.floatingImage, styles.pencil)} alt="icon" />
          <img className={cx(styles.floatingImage, styles.book)} src={book} alt="icon" />
          <img className={cx(styles.floatingImage, styles.ruler)} src={ruler} alt="icon" />
          <img className={cx(styles.floatingImage, styles.idea)} src={idea} alt="icon" />

          <h1
            className={cx(styles.heroHeader)}
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-delay="600"
          >The one place where <span>Children</span>, <br /> <span>Parents</span> and <span>Teachers</span> all come <br /> together.</h1>
          <p className={cx(styles.heroCaption)}
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-delay="800"
          >Become part of your child’s academic growth today<br /> with 9jaschoolDesk</p>

          <small style={{ color: "black", margin: "1rem 0rem" }}>Get started as</small>

          <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>

            <Button onClick={() => navigate("/login-with-class-code", { state: { category: "student" } })} title="Student" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" fontweight="bold" />

            <Button onClick={() => navigate("/login/guardian", { state: { category: "guardian" } })} title="Guardian" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" fontweight="bold" />

            <Button onClick={() => navigate("/login/teacher", { state: { category: "teacher" } })} title="Teacher" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" fontweight="bold" />

            <Button onClick={() => navigate("/login/proprietor", { state: { category: "proprietor" } })} title="Proprietor" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" fontweight="bold" />

          </div>

        </div>

        <div className={cx(styles.mainContentWrapper, "flexCol-align-center")}>

          <TopDivWave />

          <div ref={studentsRef} className={cx(styles.studentsSection, styles.sectionWrapper, "row")}>
            <div data-aos="zoom-in-left"
              // data-aos-delay="1200"
              className={cx(styles.imageDiv, "col-sm-6", "col-md-6")}
            >
              <img src={studentImage} alt="img" />
            </div>

            <div
              data-aos="zoom-in-left"
              // data-aos-delay="1000"
              className={cx(styles.contentWrapper, "col-sm-6", "col-md-6")}
            >
              <small>Students</small>
              <h3>Learning never <span className={cx(styles.wordBreak)}>got <img className={cx(styles.floatingIcon)} src={curvedHamburger} alt="icon" /></span> <br />  smoother</h3>

              <div className={cx(styles.pointsWrapper)}>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
              </div>

              <Button onClick={() => navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />

            </div>

          </div>

          <div ref={guardiansRef} className={cx(styles.guardiansSection, styles.sectionWrapper, "row")}>
            <div data-aos="zoom-in-left"
              // data-aos-delay="1200"
              className={cx(styles.imageDiv, "col-sm-6", "col-md-6")}
            >
              <img src={guardiansImage} alt="img" />
            </div>

            <div
              data-aos="zoom-in-left"
              // data-aos-delay="1000"
              className={cx(styles.contentWrapper, "col-sm-6", "col-md-6")}
            >
              <small>Guardians</small>
              <h3><span className={cx(styles.wordBreak)}>Become <img className={cx(styles.floatingIcon)} src={curvedHamburgerFlipped} alt="icon" /></span> part of your kid's <br /> learning process</h3>

              <div className={cx(styles.pointsWrapper)}>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
              </div>

              <Button onClick={() => navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />

            </div>

          </div>

          <div ref={teachersRef} className={cx(styles.teachersSection, styles.sectionWrapper, "row")}>
            <div data-aos="zoom-in-left"
              // data-aos-delay="1200"
              className={cx(styles.imageDiv, "col-sm-6", "col-md-6")}
            >
              <img src={teacherImage} alt="img" />
            </div>

            <div
              data-aos="zoom-in-left"
              // data-aos-delay="1000"
              className={cx(styles.contentWrapper, "col-sm-6", "col-md-6")}
            >
              <small>Teachers</small>
              <h3>Cordinate and Manage <span className={cx(styles.wordBreak)}>your <img className={cx(styles.floatingIcon)} src={curvedHamburger} alt="icon" /></span> <br />  classroom efficiently</h3>

              <div className={cx(styles.pointsWrapper)}>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
                <div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
              </div>

              <Button onClick={() => navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />

            </div>

          </div>

          <BottomDivWave />



        </div>

        <Testimonials />

        <section className={cx(styles.pricingWrapper)}>
          <PricingModule />
        </section>

      </div>
    </PageContainer>
  );
};

HomePage.defaultProps = {
  title: ""
};

HomePage.propTypes = {
  title: PropTypes.string
};

export default HomePage;