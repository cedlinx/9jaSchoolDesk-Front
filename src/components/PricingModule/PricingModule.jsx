import React from "react";
import cx from "classnames";
import styles from "./PricingModule.module.scss";

import PriceCard from "@/components/PriceCard/PriceCard";



const PricingModule = () => {

  const pricingArray = {
    basic: [ "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant."],
    premium: ["Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant."],
    starter: ["Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant."]
  };

  return (
    <section className={cx(styles.pricingWrapper, "flex-row")}>
      <h3>Choose the perfect plan for you</h3>
      <div className={cx(styles.cardWrapper)}>
        <PriceCard currency="N" title="Starter" amount="10000" btnText="Subscribe" benefitsArray={pricingArray.starter} />

        <PriceCard currency="N" title="Premium" amount="200000" btnText="Get 7 days Free Trial" benefitsArray={pricingArray.premium} />

        <PriceCard currency="N" title="Basic" amount="50000" btnText="Subscribe" benefitsArray={pricingArray.basic} />
      </div>
    </section>
  );
};

export default PricingModule;