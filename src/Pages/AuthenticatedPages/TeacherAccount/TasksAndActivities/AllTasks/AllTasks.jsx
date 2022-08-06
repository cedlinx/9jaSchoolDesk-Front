import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./AllTasks.module.scss";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { Icon } from "@iconify/react";
import shortenDate from "@/helpers/shortenDate";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Button from "@/components/Button/Button";
import useGetAllTasks from "@/utils/useGetAllTasks";


const AllTasks = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.teacher.loading);
  const allTasksData = useGetAllTasks();
  console.log(allTasksData);

  const columnsHeader = [
    {
      Header: () => (
        <div
          style={{
            minWidth: "12.5rem"
          }}
        >Task</div>
      ),
      accessor: "task",
      Cell: (row) => {
        let task = row.cell.row.values.task;
        return <div>
          <p style={{ fontWeight: "500", color: "#4F4F4F", fontSize: "1rem" }}>{titleCase(task)}</p>

        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        >Category</div>
      ),
      accessor: "category",
      Cell: (row) => {
        let category = row.cell.row.values.category;
        return <div>
          <p style={{ fontWeight: "500", color: "#4F4F4F", fontSize: "1rem" }}>{titleCase(category)}</p>

        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "10rem"
          }}
        >Assigned To</div>
      ),
      accessor: "assignedTo",
      Cell: (row) => {
        let assignedTo = row.cell.row.values.assignedTo;
        console.log(assignedTo);
        return <div>
          <span style={{ color: "#4F4F4F", fontSize: "1rem" }}>{assignedTo === 0 ? "All Students" : "Selected Students"}</span>
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem"
          }}
        >Due Date</div>
      ),
      accessor: "date",
      Cell: (row) => {
        let date = row.cell.row.values.date;
        return <div>
          <p style={{ fontWeight: "500", color: "#4f4f4f", fontSize: "1rem" }}>{date}</p>

        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto",
            paddingLeft: "1rem"
            // color: "#747474",
            // fontSize: "1rem"
            // textAlign: "center"
          }}
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        const [dropdownOpen, setDropdownOpen] = useState(false);

        const toggle = () => {
          setDropdownOpen(prevState => !prevState);
        };

        let data = row.cell.row.original.allData;

        return <div style={{ display: "flex", justifyContent: "space-between" }}>
          {data.status !== 1 ? <Button onClick={() => dispatch(showModal({ action: "show", type: "changeTaskStatus", modalData: { data, action: "enable" } }))} title="Enable" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" bordercolor="#D25B5D" />
            :
            <Button onClick={() => dispatch(showModal({ action: "show", type: "changeTaskStatus", modalData: { data, action: "disable" } }))} title="Disable" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#D25B5D1F" bordercolor="#D25B5D1F" />}
          <Dropdown className={cx(styles.dropdown)} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle style={{ backgroundColor: "transparent" }} name="" className={cx(styles.dropdownToggler)}>
              <Icon style={{ cursor: "pointer" }} icon="bx:dots-vertical-rounded" color="black" />
            </DropdownToggle>
            <DropdownMenu className={cx(styles.dropdownMenuWrapper)}>
              <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "modifyTask", modalData: data }))}><Icon icon="ep:edit" color="#828282" /> Edit Task</DropdownItem>
              <DropdownItem style={{ color: "#fb4e4e" }} onClick={() => dispatch(showModal({ action: "show", type: "deleteTask", modalData: data }))}> <Icon icon="fluent:delete-20-regular" color="#fb4e4e" /> Delete Task</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result = [];

    data && data.map((item, index) => {
      result.push({
        serialNumber: index + 1,
        category: item?.type && item?.type,
        imageUrl: item?.imageUrl && item?.imageUrl,
        assignedTo: item?.audience && item?.audience,
        date: item?.due_date && shortenDate(item?.due_date),
        task: item?.name && titleCase(item?.name),
        allData: item,
        action: ""
      });
    });
    return result;
  };

  return (
    <div>
      {loading ? <TableSkeleton /> : <TableComponent loading={loading} columnsHeader={columnsHeader} tableData={getTableData(allTasksData)} />}
    </div>
  );
};

export default AllTasks;