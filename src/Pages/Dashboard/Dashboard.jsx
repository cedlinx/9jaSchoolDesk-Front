import React from "react";
import PropTypes from "prop-types";
import {Routes, Route, Outlet} from "react-router-dom";
import DashboardContainer from "@/components/DashboardContainer/DashboardContainer";

const DashboardTest = props => {
  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  );
};

DashboardTest.propTypes = {
    
};

export default DashboardTest;