import React, { useState } from "react";
import { Tab, TabItem, TabContent, TabWrapper } from "./stylesV2";
import {useNavigate} from "react-router-dom";

const Tabs = ({ tabs, centralise, background, renderActionTab, formTab, leftHeader, rightHeader, midSlot, ...rest }) => {

  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabs = (index, name) => { 
    setActiveTab(index);
    name === "Payment History" ? navigate("all-payments") : null;
  };

  const ActiveTabComponent = (props) => {
    const Component = tabs[activeTab]?.component;
    return <Component {...props} activeTabName={tabs[activeTab]?.name} />;
  };
  return (
    <>
      <TabWrapper formTab={formTab}>
        <Tab centralise={centralise} background={background} formTab={formTab}>
          {tabs.map((tab, index) => (
            <TabItem
              key={index}
              isActive={activeTab === index}
              onClick={() => handleTabs(index, tab.name)}
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
    </>
  );
};

export default Tabs;
