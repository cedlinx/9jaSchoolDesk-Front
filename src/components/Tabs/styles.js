import styled from "styled-components";

export const TabWrapper = styled.div`
  background: ${({ background }) => background ?? "#fff"};
  position: relative;
  margin-bottom: 0.25rem;
  box-shadow: 0px 7px 15px rgba(38,105,93,0.04); 
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding-left: 0rem;
  width: 100%;
  overflow-y: scroll !important;

  
  @media screen and (max-width: 997px) {
    left: 0;
    z-index: 1;
    overflow-y: scroll !important;
    }
`;

export const Tab = styled.div`
  background: ${({ background }) => background ?? "#fcfcfc"};
  display: flex;
  padding: 20px 10px;
  box-shadow: 0px 1px 2px rgba(199, 223, 241, 0.25);
  ${({ centralise }) => (centralise ? "justify-content: center" : null)}
`;

export const LeftTab = styled.div`
  background: ${({ background }) => background ?? "#fcfcfc"};
  display: flex;
  padding: 20px 0px;
  box-shadow: 0px 1px 2px rgba(199, 223, 241, 0.25);
  ${({ centralise }) => (centralise ? "justify-content: center" : null)}
`;

export const RightTab = styled.div`
  background: ${({ background }) => background ?? "#fcfcfc"};
  display: flex;
  padding: 20px 10px;
  box-shadow: 0px 1px 2px rgba(199, 223, 241, 0.25);
  ${({ centralise }) => (centralise ? "justify-content: center" : null)};

  @media all and (min-width: 991px) {
      margin-left: 0rem;
  }

  @media all and (min-width: 1200px) {
    margin-left: auto;
}
`;

export const TabItem = styled.p`
  position: relative;
  padding: 5px 5px;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: grid;
  text-transform: uppercase;
  color: ${({ isActive }) => (isActive ? "#1A21BA" : "#333333")};
  text-align: center;
  margin: 0px 20px 0;
  width: 100%;
  white-space: nowrap;
`;

export const TabContent = styled.div`
 width: 100%;
`;
