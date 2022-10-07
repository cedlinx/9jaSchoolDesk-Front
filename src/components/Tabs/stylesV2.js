import styled from "styled-components";

export const TabWrapper = styled.div`
  background: ${({ background }) => background ?? "#fff"};
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0rem;
  width: 100%;
  // height: 100%;
  overflow-y: hidden !important;

  
  @media screen and (max-width: 997px) {
    left: 0;
    z-index: 1;
    overflow-y: hidden !important;
    }
`;

export const Tab = styled.div`
  background: ${({ background }) => background ?? "#fcfcfc"};
  // background-color: #D25B5D;
  // border: 1px solid #D25B5D;
  display: flex;
  padding: 0px 10px;
  gap: 1rem;
  // padding: 0.125rem;
  // border-radius: 0.5rem;
  // box-shadow: 0px 1px 2px rgba(199, 223, 241, 0.25);
  ${({ centralise }) => (centralise ? "justify-content: center" : null)}
`;

export const TabItem = styled.p`
  position: relative;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 16px;
  display: grid;
  // background-color: ${({ isActive }) => (isActive ? "#D25B5D" : "#FFF")};
  color: ${({ isActive }) => (isActive ? "#22467B" : "#4F4F4F")};
  border-bottom: ${({ isActive }) => (isActive ? "2px solid #D25B5D" : "none")};
  text-align: center;
  padding: 12px 0px;
  margin: 0rem;
  width: 100%;
  white-space: nowrap;
  font-weight: bold;
  border-radius: 0.125rem;
`;

export const TabContent = styled.div`
 width: 100%;
 height: inherit;
`;
