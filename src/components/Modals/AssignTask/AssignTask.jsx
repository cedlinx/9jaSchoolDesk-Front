import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AssignTask.module.scss";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";
import SelectAutoComplete from "@/components/SelectAutoComplete";
import { useForm, Controller } from "react-hook-form";
import { assignTaskValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { assignTask, getAllTasks } from "@/redux/Teacher/TeacherSlice";
import useGetClassDetails from "@/utils/useGetClassDetails";


const AssignTask = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proprietor.loading);
  const modalData = useSelector((state) => state.modalState.modalData);
  const classStudents = useGetClassDetails().students;

  const sendRequest = async (data) => {
    console.log(data);
    console.log(modalData);
    let selected_audience_ids = [];
    Array.isArray(data.selected_audience) && data.selected_audience.map(item => {
      selected_audience_ids.push(item.value);
    });

    let response = await dispatch(assignTask({ audience:  data.audience === "0" ? [0] : selected_audience_ids, task_id: modalData.id }));
    if (response.payload.success) {
      dispatch(showModal({ action: "hide", type: "assignTask" }));
      dispatch(getAllTasks());
    }
  };

  const resolver = yupResolver(assignTaskValidationSchema);

  const defaultValues = {
    audience: ""
  };

  const { handleSubmit, formState: { errors }, setValue, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const [displayStudentSelector, setDisplayStudentSelector] = useState(false);

  const setAudienceType = (e) => {
    let audience = e.target.value;
    setValue("audience", audience);

    if (audience === "1") {
      setDisplayStudentSelector(true);
    }
    else {
      setDisplayStudentSelector(false);
    }

  };

  const getStudentsOptions = () => {
    let options = [];
    Array.isArray(classStudents) && classStudents.map((student) => {
      options.push({
        value: student.id,
        label: `${student.firstName} ${student.lastName}`
      });
    });
    return options;
  };

  return (

    <section className={cx(styles.assignTaskContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={() => dispatch(showModal({ action: "hide", type: "assignTask" }))} icon="carbon:close-filled" color="white" />
      </div>

      <div className={cx(styles.formWrapper, "flexCol")}>
        <div className={cx(styles.header)}>
          <p>Assign Task</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => sendRequest(data))}
          className=""
        >

          <Controller
            name="audience"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label={"Assign To"}
                defaultSelect="Select "
                options={[{ value: "0", label: "Assign to entire class" }, { value: "1", label: "Assign to selected student(s)" }]}
                onChange={(e) => setAudienceType(e)}
                marginbottom="1.5rem"
                error={errors?.audience && errors?.audience?.message}
              />
            )}
          />

          {displayStudentSelector &&
                <Controller
                  name="selected_audience"
                  control={control}
                  render={({ field }) => (
                    <SelectAutoComplete
                      {...field}
                      // label={"Select Student"}
                      isMulti={true}
                      isClearable={true}
                      placeholder=""
                      options={getStudentsOptions()}
                      marginbottom="1.5rem"
                      error={errors?.selected_audience && errors?.selected_audience?.message}
                    />
                  )}
                />}

          <div onClick={handleSubmit((data) => sendRequest(data))} className={cx(styles.btnDiv, "flexRow")}>
            <Button loading={loading} disabled={loading} title="Save Changes" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
          </div>
        </form>
      </div>

    </section>
  );
};

export default AssignTask;