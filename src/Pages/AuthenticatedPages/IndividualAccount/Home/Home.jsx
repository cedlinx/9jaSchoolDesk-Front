import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import {Card, Tabs, Tab} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { allAssetsTypes, chartData } from "@/redux/Assets/assets.action";
import StarRating from "@/components/StarRating";
import {initialsCase} from "@/helpers/textTransform";
import curiosityIcon from "@/assets/icons/curiosity.svg";
import persistenceIcon from "@/assets/icons/persistence.svg";
import teamworkIcon from "@/assets/icons/teamwork.svg";
import gratitudeIcon from "@/assets/icons/gratitude.svg";
import behaviouralCardImage from "@/assets/images/behavioral-card-image.png";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import editIcon from "@/assets/icons/edit-icon.svg";
import addIcon from "@/assets/icons/add-icon.svg";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement} from "chart.js";
  
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Home = () => {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(allAssetsTypes());
  //   dispatch(chartData());
  // }, [dispatch]);

  const teachersArray = [
    {
      name: "Emenike Chidi",
      subject: "Mathematics",
      rating: 4,
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      subject: "Basic Technology",
      rating: 0,
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      subject: "Home Economics",
      rating: 0,
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      subject: "Civic Education",
      rating: 3,
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      subject: "Civic Education",
      rating: 0,
      profilePic: null
    }
  ];

  const generateColor = () => {
    const letters = "123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <section className={cx(styles.heroImageSection)}>
        <img className={cx(styles.bgImage)} src={heroImage} alt="img" />
        <div className={cx(styles.heroImageText, "flexCol")}>
          <h3>Welcome Chisimdi</h3>
          <p>Where will you like to start off today?</p>
        </div>
      </section>

      <section className={cx(styles.upperSection, "row")}>
        <div className={cx(styles.upperSectionLeft, "col-sm-12", "col-md-12", "col-xl-5")}>
          <h5>Activities</h5>
          <div className={cx(styles.contentWrapper)}>table here</div>
        </div>
        <div className={cx(styles.upperSectionMiddle, "col-sm-12", "col-md-6", "col-xl-4")}>
          <h5>Behavioural Feedback</h5>
          <div className={cx(styles.contentWrapper, "flexCol")}>
            <div className={cx(styles.header, "flexRow")}>
              <div className={cx(styles.imageDiv)}>
                <img src={behaviouralCardImage} alt="img" />
              </div>
              <div className={cx(styles.pointsDiv)}>
                <small>Total points earned</small>
                <p>10</p>
              </div>
            </div>

            <div className={cx(styles.body, "flexCol")}>
              <div><span><img src={curiosityIcon} alt="" /></span><span>Curiosity</span><span>2pts</span></div>
              <div><span><img src={gratitudeIcon} alt="" /></span><span>Gratitude</span><span>2pts</span></div>
              <div><span><img src={teamworkIcon} alt="" /></span><span>Teamwork</span><span>2pts</span></div>
              <div><span><img src={persistenceIcon} alt="" /></span><span>Persistence</span><span>2pts</span></div>
            </div>

          </div>
        </div>

        <div className={cx(styles.upperSectionRight, "col-sm-12", "col-md-6", "col-xl-3")}>
          <h5>Profile</h5>
          <div className={cx(styles.contentWrapper)}>
            <div className={cx(styles.header)}>
              <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />
              <img className={cx(styles.profilePic)}src={studentProfilePic} alt="profile pic" />
            </div>
            <div className={cx(styles.body, "flexCol")}>
              <p>Chisimdi Coker</p>
              <small>coker@gmail.com</small>
              <img src={editIcon} alt="" />
            </div>
          </div>
        </div>

      </section>     
                                
      <section className={cx(styles.lowerSection, "row")}>
        <div className={cx(styles.lowerSectionLeft, "col-md-12", "col-xl-6")}>
          <h5>Assessment Report</h5>
          <div className={cx(styles.assessmentDiv)}>table here</div>
        </div>

        <div className={cx(styles.lowerSectionRight, "col-md-12", "col-xl-6")}>
          <h5>Rate Your Teacher</h5>
          <div className={cx(styles.ratingsDiv)}>
            <div className={cx(styles.body, "flexCol")}>
              {teachersArray.map((teacher, index) => {
                return(
                  <div key={index}>
                    <span> 
                      {teacher.profilePic ? <img src={teacher.profilePic} alt="profile pic" /> : <span style={{backgroundColor: generateColor()}}>{initialsCase(teacher.name)}</span>}
                      
                    </span>
                    <div>
                      <p>{teacher.name}</p>
                      <small>{teacher.subject}</small>
                    </div>
                    <span> 
                      <StarRating
                        numberOfSelectedStar={teacher.rating}
                        numberOfStar={5}
                        onSelectStar={(value) => {
                          console.log(value, index);
                        }}
                      />
                    </span>
                  </div>
                );
              })}
              <img className={cx(styles.addIcon)} src={addIcon} alt="add" />
            </div>
          </div>
        </div>

      </section>
            
    </div>
  );
};

Home.propTypes = {
    
};

export default Home;