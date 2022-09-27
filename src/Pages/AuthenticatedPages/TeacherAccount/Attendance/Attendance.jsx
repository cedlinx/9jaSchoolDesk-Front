import React, {useState, useEffect} from "react";
import cx from "classnames";
import styles from "./Attendance.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import TableComponent from "@/components/Table/Table";
import { titleCase } from "@/helpers/textTransform";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import formatDate from "@/helpers/formatDate";
import DateComp from "@/components/Dates/Default/Default";
import { getAttendance } from "@/redux/Teacher/TeacherSlice";


const Attendance = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.teacher.loading);
  const [selectedDateValue, setSelectedDateValue] = useState(null);

  const attendanceData = useSelector((state) => state?.teacher?.getAttendanceData);

  //   useEffect(() =>{
  //     dispatch(getAttendance());
  //   },[dispatch]);

  console.log(attendanceData);

  const columnsHeader = [
    {
      Header: () => (
        <div
          style={{
            minWidth: "1rem",
            color: "#747474",
            fontSize: "1rem"
              
          }}
        >
            S/No</div>
      ),
      accessor: "serialNumber",
      Cell: (row) => {
        let serialNumber = row.cell.row.values.serialNumber;
        return <span style={{ color: "#4F4F4F" }}>{serialNumber}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Name</div>
      ),
      accessor: "name",
      Cell: (row) => {
        let name = row.cell.row.values.name;
        return <div style={{ color: "#4F4F4F", whiteSpace: "nowrap"}}>
          {name}
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >First Name </div>
      ),
      accessor: "firstName",
      Cell: (row) => {
        let firstName = row.cell.row.values.firstName;
        return <div style={{ color: "#4F4F4F", whiteSpace: "nowrap"}}>
          {firstName}
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto",
            color: "#747474",
            fontSize: "1rem",
            whiteSpace: "nowrap"
          }}
        >Last Name </div>
      ),
      accessor: "lastName",
      Cell: (row) => {
        let lastName = row.cell.row.values.lastName;
        return <div style={{ color: "#4F4F4F", whiteSpace: "nowrap" }} >
          {lastName}
  
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto",
            color: "#747474",
            fontSize: "1rem",
            whiteSpace: "nowrap"
          }}
        >Status</div>
      ),
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <div style={{ color: "#4F4F4F", whiteSpace: "nowrap" }} >
          {status === "1" ? <Icon icon="bxs:badge-check" color="green" /> : <Icon icon="mdi:account-cancel" color="tomato" />}
          {status === "1" ? <Icon icon="bxs:user-check" color="green" /> : <Icon icon="ci:user-close" color="tomato" />}

          
          {status === "1" ? <Icon icon="healthicons:yes" color="green" width={16} /> : <Icon icon="healthicons:no" color="tomato" width={16} />}
        </div>;
      }
    }
  ];
  
  let getTableData = (data) => {
    let result = [];
  
    data && data.map((item, index) => {
      result.push({
        serialNumber: index + 1,
        firstName: item?.firstName && titleCase(item?.firstName),
        lastName: item?.lastName && titleCase(item?.lastName),
        email: item?.email && item?.email,
        name: item?.name && item?.name,
        status: item?.status && item?.status,
        allData: item
      });
    });
    return result;
  };

  const dateValue = (date) => {
    console.log(date);
    setSelectedDateValue(date);
  };

    
  return (
    <div className={cx(styles.attendanceContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <h5>Attendance Report for {formatDate(selectedDateValue)}</h5>
      </div>
      <div className={cx(styles.dateSection, "flexRow")}>
        <DateComp dateValue={dateValue} />
      </div>
      {loading ? <TableSkeleton /> : Array.isArray(attendanceData?.completed_tasks) && attendanceData?.completed_tasks.length > 0 ?
        <>
          <div className={cx(styles.tableDiv)}>
            <TableComponent columnsHeader={columnsHeader} tableData= {getTableData(attendanceData?.graded_tasks)} /> 
          </div>
        </>
        : <div className={cx(styles.noDataDiv)}>
          <p>There is currently no attendance data for the selected date</p>
        </div>
      }
    </div>
  );
};

export default Attendance;