import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useDispatch } from "react-redux";
import TableComponent from "@/components/Table/Table";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import expandIcon from "@/assets/icons/expand-icon.svg";
import { showModal } from "@/redux/ModalState/ModalSlice";
import formatDate from "@/helpers/formatDate";
import { useNavigate } from "react-router-dom";


const PendingTasks = ({pendingTasks}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const columnsHeaderActivities = [                
    // {
    //   Header: () => (
    //     <div
    //       style={{
    //         width: "0.5rem"
    //       }}
    //     />
    //   ),
    //   accessor: "status",
    //   Cell: (row) => {
    //     let status = row.cell.row.values.status;
    //     return <span>{status === 1 ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
    //   }
    // },
    {
      Header: () => (
        <div style={{fontSize: "0.875rem"}}>Tasks</div>
      ),
      accessor: "name",
      Cell: (row) => {
        let name = row.cell.row.values.name;
        let allData = row.cell.row.original.allData;

        return <div  style={{width: "100%"}}>
          <p  className={cx("flexRow-space-between")} >
            <span style={{fontWeight: "500", color: "#828282", fontSize: "14px",   whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: "0.5rem"}}>{name}</span>
            <span><img onClick={() => dispatch(showModal({action: "show", type: "taskDetails", modalData: allData}))} style={{cursor: "pointer"}} src={expandIcon} alt="" /></span>
          </p>          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto", fontSize: "0.875rem"
          }}
        >Due Date</div>
      ),
      accessor: "due_date",
      Cell: (row) => {
        let due_date = row.cell.row.values.due_date;
        return <div  style={{ width: "auto"}}>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{due_date}</p>
              
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto", fontSize: "0.875rem"
          }}
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let allData = row.cell.row.original.allData;

        return <div>
          <button style={{backgroundColor: "#2AC769", borderRadius: "1rem", color: "#fff", border: "none", fontSize: "0.75rem", padding: "0.5rem 1rem", cursor: "pointer"}} onClick={()=> navigate("/student/submit-task", { state:{data: allData}})}>
                Submit
          </button>
              
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
        due_date: item?.due_date && formatDate(item?.due_date),
        name: item?.name && titleCase(item?.name),
        allData: item && item
      });
    });
    return result;
  };

  return (
    <>
      {pendingTasks && pendingTasks.length > 0 ? <TableComponent columnsHeader={columnsHeaderActivities} tableData= {getTableData(pendingTasks)} /> : <div style={{textAlign: "center", fontSize: "1.5rem", color: "#828282"}}>You currently have no pending task</div>}
    </>
    
  );
};

PendingTasks.defaultProps = {
  pendingTasks: [""]
};

PendingTasks.propTypes = {
  pendingTasks: PropTypes.array
};

export default PendingTasks;