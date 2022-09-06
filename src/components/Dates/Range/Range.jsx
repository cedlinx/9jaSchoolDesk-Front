import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import cx from "classnames";
import styles from "./Range.module.scss";

import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeComp = ({dateValue}) => {

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection"
    }
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle 
  const refOne = useRef(null);

  dateValue(range[0]);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if( e.key === "Escape" ) {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false);
    }
  };

  return (
    <div className={cx(styles.calendarWrap)}>

      <input
        value={`${format(range[0].startDate, "MM/dd/yy")} - ${format(range[0].endDate, "MM/dd/yy")}`}
        readOnly
        className={cx(styles.inputBox)}
        onClick={() => setOpen(open => !open)}
      />

      <div ref={refOne}>
        {open && 
        <>
          <DateRange
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className={cx(styles.calendarElement)}
          />
       
        </>
        }
      </div>

    </div>
  );
};

export default DateRangeComp;