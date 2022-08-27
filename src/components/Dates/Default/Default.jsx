import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import cx from "classnames";
import styles from "./Default.module.scss";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComp = () => {

  // date state
  const [calendar, setCalendar] = useState("");

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle 
  const refOne = useRef(null);

  useEffect(() => {
    // set current date on component load
    setCalendar(format(new Date(), "MM/dd/yyyy"));
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false);
    }
  };

  // on date change, store date in state
  const handleSelect = (date) => {
    // console.log(date)
    // console.log(format(date, 'MM/dd/yyyy'))
    setCalendar(format(date, "MM/dd/yyyy"));
  };

  return (
    <div className={cx(styles.calendarWrap)}>

      <input
        value={calendar}
        readOnly
        className={cx(styles.inputBox)}
        onClick={() => setOpen(open => !open)}
      />

      <div ref={refOne}>
        {open && 
          <Calendar
            date={new Date()}
            onChange = {handleSelect}
            className={cx(styles.calendarElement)}
          />
        }
      </div>

    </div>
  );
};

export default CalendarComp;