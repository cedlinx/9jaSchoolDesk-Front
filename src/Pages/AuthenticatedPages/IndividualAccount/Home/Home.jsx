import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import {Card, Tabs, Tab} from "react-bootstrap";
import { Icon } from '@iconify/react';
import { allAssetsTypes, chartData } from "@/redux/Assets/assets.action";

import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement} from "chart.js";
  
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Home = () => {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(allAssetsTypes());
  //   dispatch(chartData());
  // }, [dispatch]);

  
  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <section className={cx(styles.heroImageSection)}>
        <img src="" alt="img" />
        <div>
          <h3>Welcome Chisimdi</h3>
          <p>Where will you like to start off today?</p>
        </div>
      </section>

      <section className={cx(styles.upperSection, "row")}>
      <div className={cx(styles.upperSectionLeft, "col-md-5")}>
        <h3>Activities</h3>
        <div>table here</div>
      </div>
        <div className={cx(styles.upperSectionMiddle, "col-md-4")}>
          <h3>Behavioural Feedback</h3>
        <div>
          <div>
            <div>
              <img src="" alt="img" />
            </div>
            <div>
              <small>Total points earned</small>
              <p>10</p>
            </div>
          </div>

          <div>
            <div><span>icon</span><span>Curiosity</span><span>2pts</span></div>
            <div><span>icon</span><span>Gratitude</span><span>2pts</span></div>
            <div><span>icon</span><span>Teamwork</span><span>2pts</span></div>
            <div><span>icon</span><span>Persistence</span><span>2pts</span></div>
          </div>
        </div>
        </div>
        <div className={cx(styles.upperSectionRight, "col-md-3")}>
        <h3>Profile</h3>
        <div>
          <div>
            <img src="" alt="heroBg" /><img src="" alt="picture" />
          </div>
          <div>
            <p>Chisimdi Coker</p>
            <small>coker@gmail.com</small>
            <Icon icon="el:pencil-alt" color="brown" />
          </div>
        </div>
        </div>

      </section>

      <section className={cx(styles.lowerSection, "row")}>
      <div className={cx(styles.lowerSectionLeft, "col-md-6")}>
        <h3>Assessment Report</h3>
        <div>table here</div>
      </div>

        <div className={cx(styles.lowerSectionRight, "col-md-6")}>
        <h3>Rate Your Teacher</h3>
        <div>table here</div>
        </div>

      </section>
            
    </div>
  );
};

Home.propTypes = {
    
};

export default Home;