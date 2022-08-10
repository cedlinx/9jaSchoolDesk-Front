import React, {useState} from "react";
import cx from "classnames";
import styles from "./SelectClass.module.scss";
import Logo from "@/assets/images/Logo.svg";
import { allStudentsData } from "@/helpers/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useGetTeacherDetails from "@/utils/useGetTeacherDetails";
import useSwitchClass from "@/utils/useSwitchClass";
import { toast } from "react-toastify";


const SelectClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [classID, setClassID] = useState("");

  const teacherDetails = useGetTeacherDetails();
  const switchClass = useSwitchClass(classID);

  let classesArray = teacherDetails?.classes;

  console.log(teacherDetails);

  const handleSwitchClass = async (class_id) => {
    console.log(class_id);
    setClassID(class_id);
    toast("Switching class...");
    let response = await switchClass;
    console.log(response, "switch response");
    navigate("/teacher/dashboard");
    // if (response.message.success) {
    //   navigate("/teacher/dashboard");
    // }
  };


  return (
    <div className={cx(styles.selectClassWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <img src={Logo} alt="" />
        <p>Select a class to continue</p>
      </div>
      <div className={cx(styles.body)}>
        {Array.isArray(allStudentsData) && allStudentsData.map((element, index) => {
          return (
            <div key={index} onClick={() => handleSwitchClass(element?.id)} className={cx(styles.studentContainer, "flexCol")}>
              <div className={cx(styles.imageDiv)}>
                <Icon icon="healthicons:i-training-class" color="#d25b5d" width="72" />
              </div>
              <p>{element?.name}</p>
              {/* <p>JSS 1 A</p> */}
            </div>
          );
        }
        )}

      </div>
    </div>
  );
};

export default SelectClass;