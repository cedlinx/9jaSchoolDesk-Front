import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./Accordion.module.scss";
import "./accordion.css";
import { Accordion, AccordionItem, AccordionItemHeading,  AccordionItemButton, AccordionItemPanel} from "react-accessible-accordion";
import singleSubmissionIcon from "@/assets/icons/single-submission-icon.svg";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextInput/TextInput";
import { Icon } from "@iconify/react";
import { titleCase } from "@/helpers/textTransform";
import parse from "html-react-parser";
import InputField from "@/components/Input/Input";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { submitFeedbackValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { assessTask, getStudentsAssignedToTask } from "@/redux/Teacher/TeacherSlice";

const AccordionComponent =(props)=>{

  const {accordionArray} = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.teacher.loading);
  const [feedbackData, setFeedbackData] = useState({
    feedback: "",
    score: "",
    index: ""
  });
  console.log(accordionArray);

  const sendRequest = async (data, task) => {
    console.log(data);
    let response = await dispatch(assessTask({...data, audience: [task?.pivot?.student_id], task_id: task?.pivot?.task_id }));
    console.log(response);
    if (response.payload.success) {
      // dispatch(getAllTasks());
      dispatch(getStudentsAssignedToTask(task?.pivot?.task_id));
    }

  };

  const resolver = yupResolver(submitFeedbackValidationSchema);

  const defaultValues = {
    feedback: "",
    score: ""
  };

  const handleFeedbackChange =(e, index)=>{
    setFeedbackData({...feedbackData, feedback: e.target.value, index: index});
  };

  const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ defaultValues, resolver, mode: "all" });
  const { fields, append, remove } = useFieldArray({ name: "task", control });

  console.log(errors);
  return (
    <section className={cx(styles.submissionAccordionContainer, "faq section--py")}>
      <div className="container flex">

        <div className="faq__content">
          <Accordion allowZeroExpanded={true}>
            {accordionArray && accordionArray.map((item, index) => (
              <AccordionItem className={cx(styles.accordionItem)} key={index}>
                <AccordionItemHeading className={cx(styles.accordionHeading)}>
                  <AccordionItemButton>
                    <img src={singleSubmissionIcon} alt="icon" />
                    <span className={cx(styles.title)}>
                      {`${titleCase(item?.firstName)} ${titleCase(item?.lastName)}`}
                    </span>
                   
                    <Button bgColor="#D25B5D" textColor="#fff" title="View" />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className={cx(styles.accordionPanel)}>
                  <div className={cx("row", "g-0")}>
                    <div className={cx("col-sm-12", "col-md-6", "col-lg-6", styles.leftSection)}>
                      {item?.pivot?.attachment && <div className={cx(styles.attachmentDiv, "flexCol")}>
                        <small>
                        Attachment
                        </small>
                        <a href={item?.pivot?.attachment}>
                          <span>File</span>                       
                          <Icon icon="bi:download" color="#d25b5d" />
                        </a>
                      </div>}

                      {item?.pivot?.solution && <div className={cx(styles.answerDiv)}>
                        <small>Solution</small>
                        <div>
                          {parse(item?.pivot?.solution)}
                        </div>
                      </div>}
                    
                    </div>
                    <div className={cx("col-sm-12", "col-md-6", "col-lg-6", styles.rightSection, "flexCol")}>
                      <form
                        onSubmit={handleSubmit((data) => sendRequest(data, item))}
                        className={cx("flexCol")}
                      >
                        <div className={cx(styles.formGroup, "flexCol")}>
                          <Controller
                            name="feedback"
                            control={control}
                            render={({ field, ref }) => (
                              <TextArea 
                                {...field}
                                placeholder="Leave a feedback for the student"
                                error={errors?.feedback?.message}
                                // onChange={(e) => handleFeedbackChange(e, index)}
                                // readonly={item?.pivot?.status && item?.pivot?.status.toLowerCase() === "graded"}
                                // value={feedbackData?.index === index ? feedbackData?.feedback : item?.pivot?.feedback}

                              />
                            )}
                          />
                        </div>

                        <div className={cx(styles.formGroup, "flexCol")}>
                          <Controller
                            name="score"
                            control={control}
                            render={({ field, ref }) => (
                              <InputField
                                {...field}
                                placeholder="Score"
                                label={"Score"}
                                type="number"
                                error={errors?.score?.message}
                                // readOnly={item?.pivot?.status && item?.pivot?.status.toLowerCase() === "graded"}
                                // onChange={(e)=>handleScoreChange(e, index)}
                              />
                            )}
                          />
                        </div>
                      
                        <Button loading={loading} disabled={loading}onClick={handleSubmit((data) => sendRequest(data, item))} title="Send" bgColor="#D25B5D" textColor="#fff" />
                      </form>
                    </div>
                  </div>
                  
              
                </AccordionItemPanel>
              </AccordionItem>
            ))}
                        
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default AccordionComponent;