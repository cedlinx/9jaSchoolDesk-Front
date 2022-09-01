import React from "react";
import cx from "classnames";
import styles from "./SwitchWardLoader.module.scss";
import Loader from "@/components/Loader/index";

const SwitchWardLoader = () => {

  return (
    <section className={cx(styles.switchWardLoaderContainer, "flexCol")}>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header, "flexCol")}>
          {/* <p>Switch Ward</p> */}
        </div>

        <div style={{ textAlign: "center" }}>
          <Loader />
          <small>...Switching...</small>
        </div>
      </div>

    </section>
  );
};

export default SwitchWardLoader;