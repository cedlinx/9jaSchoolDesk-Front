import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import { Icon } from "@iconify/react";
import { allAssetsTypes, chartData } from "@/redux/Assets/assets.action";
import StarRating from "@/components/StarRating";
import {initialsCase} from "@/helpers/textTransform";
import curiosityIcon from "@/assets/icons/curiosity.svg";
import persistenceIcon from "@/assets/icons/persistence.svg";
import teamworkIcon from "@/assets/icons/teamwork.svg";
import gratitudeIcon from "@/assets/icons/gratitude.svg";
import expandIcon from "@/assets/icons/expand-icon.svg";
import behaviouralCardImage from "@/assets/images/behavioral-card-image.png";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import profileCardHeaderBg from "@/assets/images/profile-card-bg.png";
import heroImage from "@/assets/images/student-dashboard-hero-image.png";
import editIcon from "@/assets/icons/edit-icon.svg";
import addIcon from "@/assets/icons/add-icon.svg";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";

import EditProfileModal from "@/components/Modals/EditProfile/EditProfile";
import UploadActivityModal from "@/components/Modals/UploadActivity/UploadActivity";
import SubmitAssessmentModal from "@/components/Modals/SubmitAssessment/SubmitAssessment";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/modalState.action";

import Tabs from "@/components/Tabs/TabsV2";
import Tests from "./Tests/Tests";
import Tasks from "./Tasks/Tasks";
import Assignments from "./Assignments/Assignments";


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);

  const RenderTests = () => <Tests />;
  const RenderAssignments = () => <Assignments />;
  const RenderTasks = () => <Tasks />;

  const tabsComponents = [
    { name: "Tests", component: RenderTests },
    { name: "Assignments", component: RenderAssignments },
    { name: "Tasks", component: RenderTasks }
  ];

  const teachersArray = [
    {
      name: "Emenike Chidi",
      subject: "Mathematics",
      rating: 4,
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      subject: "Basic Technology",
      rating: 0,
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      subject: "Home Economics",
      rating: 0,
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      subject: "Civic Education",
      rating: 3,
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      subject: "Civic Education",
      rating: 0,
      profilePic: null
    }
  ];

  const generateColor = () => {
    const letters = "123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  let shortenDate=(value)=>{
    let date = new Date(value);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
    let dateValue = date.toLocaleDateString("en-US", options);
    return `${dateValue}`;
  };


  const columnsHeaderAssessment = [                
    {
      Header: () => (
        <div
          style={{
            minWidth: "1rem"
          }}
        />
      ),
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <span>{status.toLowerCase() === "read" ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        />
      ),
      accessor: "imageUrl",
      Cell: (row) => {
        let imageUrl = row.cell.row.values.imageUrl;
        return <div>
          <img style={{borderRadius: "50%", width: "3rem"}} src={imageUrl} alt="img" />
        </div>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "teacherDetails",
      Cell: (row) => {
        let details = row.cell.row.values.teacherDetails;
        return <div  style={{width: "7rem"}}>
          <p style={{fontWeight: "500", color: "#4f4f4f"}}>{titleCase(details.name)}</p>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{titleCase(details.subject)}</p>
          
        </div>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "description",
      Cell: (row) => {
        let description = row.cell.row.values.description;
        return <div  style={{width: "15rem"}}>
          <p className={cx("flexRow-space-between")} ><span style={{fontWeight: "500", color: "#828282", fontSize: "14px",   whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "15rem", marginRight: "0.5rem"}}>{description}</span><span><img style={{cursor: "pointer"}} src={expandIcon} alt="" /></span></p>          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem"
          }}
        />
      ),
      accessor: "date",
      Cell: (row) => {
        let date = row.cell.row.values.date;
        return <div>
          <p style={{fontWeight: "500", color: "#BDBDBD", fontSize: "12px"}}>{date}</p>
          
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result =[];

    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        status: item?.status && item?.status,
        imageUrl: item?.imageUrl && item?.imageUrl,
        teacherDetails: item?.teacherDetails && item?.teacherDetails,
        date: item?.date && shortenDate(item?.date),
        description: item?.description && titleCase(item?.description)
      });
    });
    return result;
  };

  const editProfileModal = () => {
    return (
      <EditProfileModal />
    );
  };

  const submitAssessmentModal = () => {
    return (
      <SubmitAssessmentModal />
    );
  };

  const uploadActivityModal = () => {
    return (
      <UploadActivityModal />
    );
  };
  
  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <section className={cx(styles.heroImageSection)}>
        <img className={cx(styles.bgImage)} src={heroImage} alt="img" />
        <div className={cx(styles.heroImageText, "flexCol")}>
          <h3>Welcome Chisimdi</h3>
          <p>Where will you like to start off today?</p>
        </div>
      </section>

      <section className={cx(styles.upperSection, "row")}>

        <div className={cx(styles.upperSectionLeft, "col-md-12", "col-xl-6")}>
          <div className={cx("flexRow-space-between")}>
            <h5>Activities</h5>
          </div>
          <div className={cx(styles.contentWrapper)}>
            <Tabs tabs={tabsComponents} />
          </div>
        </div>
        
        <div className={cx(styles.upperSectionRight, "col-md-12", "col-xl-6")}>
          <div className={cx(styles.header, "flexRow-space-between")}>
            <h5>Assessment Feedback</h5>
            <small onClick={() => navigate("assessment-feedback")}>View all</small>
          </div>
          <div className={cx(styles.assessmentDiv)}>
            {<TableComponent columnsHeader={columnsHeaderAssessment} tableData= {getTableData(assessmentData)} />}
          </div>
        </div>

      

      </section>
      
      <section className={cx(styles.lowerSection, "row")}>
        <div className={cx(styles.lowerSectionLeft, "col-sm-12", "col-md-12", "col-xl-3")}>

          <h5>Behavioural Feedback</h5>
          <div className={cx(styles.contentWrapper, "flexCol")}>
            <div className={cx(styles.header, "flexRow")}>
              <div className={cx(styles.imageDiv)}>
                <img src={behaviouralCardImage} alt="img" />
              </div>
              <div className={cx(styles.pointsDiv)}>
                <small>Total points earned</small>
                <p>10</p>
              </div>
            </div>

            <div className={cx(styles.body, "flexCol")}>
              <div><span><img src={curiosityIcon} alt="" /></span><span>Curiosity</span><span>2 pts</span></div>
              <div><span><img src={gratitudeIcon} alt="" /></span><span>Gratitude</span><span>2 pts</span></div>
              <div><span><img src={teamworkIcon} alt="" /></span><span>Teamwork</span><span>2 pts</span></div>
              <div><span><img src={persistenceIcon} alt="" /></span><span>Persistence</span><span>2 pts</span></div>
            </div>

          </div>

        
  
        </div>


        <div className={cx(styles.lowerSectionMiddle, "col-sm-12", "col-md-6", "col-xl-6")}>
          <h5>Rate Your Teacher</h5>
          <div className={cx(styles.ratingsDiv)}>
            <div className={cx(styles.body, "flexCol")}>
              {teachersArray.map((teacher, index) => {
                return(
                  <div key={index}>
                    <span> 
                      {teacher.profilePic ? <img src={teacher.profilePic} alt="profile pic" /> : <span style={{backgroundColor: generateColor()}}>{initialsCase(teacher.name)}</span>}
                      
                    </span>
                    <div>
                      <p>{teacher.name}</p>
                      <small>{teacher.subject}</small>
                    </div>
                    <span> 
                      <StarRating
                        numberOfSelectedStar={teacher.rating}
                        numberOfStar={5}
                        onSelectStar={(value) => {
                        }}
                      />
                    </span>
                  </div>
                );
              })}
              {/* <img className={cx(styles.addIcon)} src={addIcon} alt="add" /> */}
            </div>
          </div>
        </div>

        <div className={cx(styles.lowerSectionRight, "col-sm-12", "col-md-6", "col-xl-3")}>
          <h5>Profile</h5>
          <div className={cx(styles.contentWrapper)}>
            <div className={cx(styles.header)}>
              <img className={cx(styles.bgImage)} src={profileCardHeaderBg} alt="bg pic" />
              <img className={cx(styles.profilePic)}src={studentProfilePic} alt="profile pic" />
            </div>
            <div className={cx(styles.body, "flexCol")}>
              <p>Chisimdi Coker</p>
              <small>coker@gmail.com</small>
              <img onClick={()=>dispatch(showModal({ action: "show", type: "editProfile" }))} src={editIcon} alt="" />
            </div>
          </div>
        </div>

      </section>     
                                
    

      {modalState === "show" ? <Modal show >{modalType === "editProfile" ? editProfileModal() : modalType === "submitAssessment" ? submitAssessmentModal() : modalType === "uploadActivity" ? uploadActivityModal()  : null}</Modal> : null}
            
    </div>
  );
};

Home.propTypes = {
    
};

export default Home;