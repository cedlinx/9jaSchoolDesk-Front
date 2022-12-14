import React, { useState, useEffect } from "react";
import { Tab, TabItem, TabContent, TabWrapper } from "./stylesV2";
import {useNavigate} from "react-router-dom";

const Tabs = ({ tabs, centralise, background, renderActionTab, formTab, leftHeader, rightHeader, midSlot, ...rest }) => {

  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    const pathArray = path.split("/");
    const pathName = pathArray[pathArray.length - 1];
    const tab = tabs.find((tab) => tab.path === pathName);
    if (tab) {
      setActiveTab(tabs.indexOf(tab));
    } 
  }, []);

  const handleTabs = (index, path) => { 
    setActiveTab(index);
    navigate(`${path}`);
  };

  const ActiveTabComponent = (props) => {
    const Component = tabs[activeTab]?.component;
    return <Component {...props} activeTabName={tabs[activeTab]?.name} />;
  };
  return (
    <div style={{height: "100%", width: "100%", display: "flex", flexDirection: "column"}}>
      <TabWrapper formTab={formTab}>
        <Tab centralise={centralise} background={background} formTab={formTab}>
          {tabs.map((tab, index) => (
            <TabItem
              key={index}
              isActive={activeTab === index}
              onClick={() => handleTabs(index, tab.path)}
              {...rest}
            >
              {tab.name}
            </TabItem>
          ))}
        </Tab>
      </TabWrapper>
      <TabContent>
        <ActiveTabComponent {...rest} />
      </TabContent>
    </div>
  );
};

export default Tabs;
