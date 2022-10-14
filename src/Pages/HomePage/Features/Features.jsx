import React from "react";
import cx from "classnames";
import styles from "./Features.module.scss";
import { titleCase } from "@/helpers/textTransform";
import circleIcon from "@/assets/icons/circle_icon.svg";
import { Icon } from "@iconify/react";

const Features = () => {

  const featuresData = [
    {
      students: [
        {
          title: "Academic & Behavioral Progress Tracking",
          description: "Easily monitor your progress in your classes, both academically and behaviorally."
        },
        {
          title: "Results",
          description: "Students can access results easily and quickly on the dashboard. Once the result has been published by the school, students can access it from anywhere and at any time."
        },
        {
          title: "Class Notes- Video Lessons - Homework - E-Test",
          description: "Teachers can remotely send class notes, Video lesson, assignment to students on the 9JASCHOOLDESK. The student can access the assignment, video lesson and class note from anywhere and at any time."
        },
        {
          title: "Class Gist",
          description: "This is a school social media platform, in which the student uses to stay connected with class colleagues and teacher.  This social media space is overseen by the school administrator and teachers."
        }
      ]
    },
    {
      guardians: [
        {
          title: "Academic Progress",
          description: "Parents can view their child(ren) academic activities and track performance across all subjects, class, level and school sections, including honest and robust teacher remarks and comments in order to know the student progress in real time."
        },
        {
          title: "Finance & Fees Payment",
          description: "With 9JASCHOOLDESK secure transaction solution, you can conveniently pay fees with your phone or computer using 9JASCHOOLDESK safe and secure transaction solution.  Student’s School fees and other expenses can be paid seamlessly with appropriate bill history through the 9JASCHOOLDESK Platform reducing stress and granting fast accessibility."
        },
        {
          title: "Parent Dashboard",
          description: "Parents have a personalized dashboard with secure login credentials to overseen only their child(ren) data(s)."
        },
   
        {
          title: "Behavioral Monitor – Assessment",
          description: "With the behavior monitor module, you can easily monitor your child(Ren) behavior progress at school in real time."
        },
  
        {
          title: "Results and Assessment Tracking",
          description: "Parents have fast access to and can track student reports anywhere and at any time."
        }
      ]
    },
    {
      teachers: [
        {
          title: "Grading & Assessment",
          description: "Teachers on 9JASCHOOLDESK have Unlimited flexibility in creating assessment formats for computing and assigning grades. Keeping parents up to date with their child’s progress, plus quickly identify and address patterns of progress for groups or individuals and so much more."
        },
        {
          title: "Attendance Management",
          description: "9JASCHOOLDESK Eliminates absenteeism and lateness with attendance solution. Daily attendance can be marked and attendance status communicated with parents to indicate lateness, tardiness and to ensure proper monitoring of the students and Generate weekly, monthly and termly reports and in real time."
        },
        {
          title: "Lesson Notes & Online assessment",
          description: "Teachers can create homework with defined due dates, subject notes, and resources in seconds and instantly share with students from anywhere and at any time. Assign, track & evaluate homework of every student with lesson note and online assessment module."
        }
      ]
    },
    {
      proprietors: [
        {
          title: "Student management",
          description: "School Admins will have quick and easy access to all student records, current and alumni. Get easy access to student particulars, grades stand, parents information, disciplinary and Behavior monitoring and so much more."
        },
        {
          title: "Teacher management",
          description: "School Admins will be able to manage teachers with ease as you can assign classes to teachers and manage teacher’s data, lesson, records and so much more."
        },
        {
          title: "Cloud database",
          description: "All the school data, record and reports will be stored in here and can be accessible from anywhere and at any time and it’s a life proof storage."
        },
        {
          title: "User Roles & Permissions",
          description: "Assign and manage employee privileges based on the role they play in the institution, such as subject teacher, head teacher, counsellor, principal, accountant, et cetera."
        },
        {
          title: "Timetable Management",
          description: "Create clear and error-free timetables, ensuring the best utilization and optimization of teachers and employees across your institution."
        },
        {
          title: "Finance Management",
          description: "Secure and comprehensive finance module that simplifies managing and tracking school finances; i.e. creating and assigning fees, tracking full and part payments, and generating finance reports."
        },
        {
          title: "Inventory Management",
          description: "Record, manage and process all assets and inventory in the most pragmatic way. Get clear reports and insight about the status, consumption, and availability of goods and stock items."
        },
        {
          title: "Message Board, Email, & SMS",
          description: "Spread the news and keep all your employees, students and parents engaged by bringing the latest happenings right to their dashboard."
        },
        {
          title: "Grading, Results, & transcripts",
          description: "Create customized grading systems according to your school’s unique structure. Fully automated and error-free result compilation and report generation in multiple formats for students, subjects, classes and levels."
        }
      ]
    }
  ];

  return (
    <div className={cx(styles.featuresContainer, "flexCol")}>
      <h3>Features</h3>
      {featuresData.map((element, index) =>{
        return (
          <div className={cx(styles.innerContainer, "flexCol")} key={index}>
            <p className={cx(styles.subCategory)}>{titleCase(Object.keys(element)[0])}</p>
            <div className={cx(styles.pointsContainer, "flexRow")}>
              {
                Object.values(element)[0].map((feature, idx) =>{
                  return (
                    <div key={idx} className={cx(styles.wrapper, "flexCol")}>
                      <div className={cx(styles.heading, "flexRow")}>
                        <span>
                          {/* <img src={circleIcon} /> */}
                          <Icon icon="bi:list-check" color="#d25b5d" width={12} />
                        </span>
                        <span>{feature.title}</span> 
                      </div>
                      <div className={cx(styles.details)}>
                        <span>{feature.description}</span>
                      </div>
                    </div>
                  );
                })
              } 
            </div>
          </div>
        );
      }) }
    </div>
  );
};

export default Features;