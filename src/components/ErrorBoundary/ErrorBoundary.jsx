import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import Button from "@/components/Button/Button";
// import { useNavigate } from "react-router-dom";

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #fff;

  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;

const Fallback = ({ resetErrorBoundary }) => {
//   const navigate = useNavigate();

  const handleRefresh = () => {
    resetErrorBoundary();
  };

  return (
    <ErrorWrapper>
      <div className="">
        <p className="mb-4"> An Error Occurred</p>
        {/* <div> */}
        {/* <Button onClick={() => navigate(-1)}>Go Back</Button> */}
        <Button onClick={() => handleRefresh()}  title="Refresh Page" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
        {/* </div> */}
      </div>
    </ErrorWrapper>
  );
};

const ErrorBoundaryWrapper = ({ children }) => (
  <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>
);

Fallback.propTypes = {
  resetErrorBoundary: PropTypes.func.isRequired
};

ErrorBoundaryWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundaryWrapper;
