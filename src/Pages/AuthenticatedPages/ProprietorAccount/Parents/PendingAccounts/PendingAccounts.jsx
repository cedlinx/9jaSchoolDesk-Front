import React, {useState} from "react";
import cx from "classnames";
import styles from "./PendingAccounts.module.scss";
import {useDispatch, useSelector} from "react-redux";
import { Icon } from "@iconify/react";
import Button from "@/components/Button/Button";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
// import {newSignUpsData} from "@/helpers/sampleData";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "reactstrap";



const PendingAccounts = () => {

  const dispatch = useDispatch();
  const allPendingGuardians = useSelector((state) => state?.proprietor?.getGuardianStatusData.suspendedList);

  console.log(allPendingGuardians);

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
        return <span style={{ color: "#4F4F4F"}}>{serialNumber}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >First Name </div>
      ),
      accessor: "firstName",
      Cell: (row) => {
        let firstName = row.cell.row.values.firstName;
        return <div style={{ color: "#4F4F4F"}}>
          {firstName}
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Last Name </div>
      ),
      accessor: "lastName",
      Cell: (row) => {
        let lastName = row.cell.row.values.lastName;
        return <div style={{ color: "#4F4F4F"}} >
          {lastName}
          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Email</div>
      ),
      accessor: "email",
      Cell: (row) => {
        let email = row.cell.row.values.email;
        return <div  style={{width: "15rem"}}>
          <p style={{ color: "#4F4F4F"}}>{email}</p>         
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
            textAlign: "center"
          }}
        >Actions</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let allData = row.cell.row.original.allData;
        return <div  style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Button onClick={() => dispatch(showModal({action: "show", type: "activateGuardian", modalData: allData }))} title="Activate" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF6A00" hoverColor="#fff" hoverBg="#ff6a00" />

          <Button onClick={() => dispatch(showModal({action: "show", type: "rejectGuardian", modalData: allData }))} title="Reject Application" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF6A00" hoverColor="#fff" hoverBg="#ff6a00" />

        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "3rem",
            color: "#747474",
            fontSize: "1rem",
            textAlign: "center"
          }}
        />
      ),
      accessor: "options",
      Cell: (row) => {
        const [dropdownOpen, setDropdownOpen] = useState(false);

        const toggle = () => {
          setDropdownOpen(prevState => !prevState);
        };

        let data = row.cell.row.original.allData;

        return <div>
          <Dropdown className={cx(styles.dropdown)} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle style={{backgroundColor: "transparent"}} name="" className={cx(styles.dropdownToggler)}>
              <Icon style={{cursor: "pointer"}} icon="bx:dots-vertical-rounded" color="black" />
            </DropdownToggle>
            <DropdownMenu className={cx(styles.dropdownMenuWrapper)}>
              <DropdownItem onClick={() => dispatch(showModal({action: "show", type: "rejectGuardian", modalData: data}))}>Reject Application</DropdownItem>  
              <DropdownItem onClick={() => dispatch(showModal({action: "show", type: "guardianDetails", modalData: data}))}>View Details</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result =[];

    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        firstName: item?.firstName && titleCase(item?.firstName),
        lastName: item?.lastName && titleCase(item?.lastName),
        email: item?.email && item?.email,
        action: "",
        allData: item
      });
    });
    return result;
  };
    
  return (

    <TableComponent columnsHeader={columnsHeader} tableData= {getTableData(allPendingGuardians)} showHeader={true}/>                
  );
};

export default PendingAccounts;