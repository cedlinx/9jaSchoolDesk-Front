import React, { useState, useEffect } from "react";
import cx from "classnames";
import styles from "./ApprovedAccounts.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Button from "@/components/Button/Button";
import TableComponent from "@/components/Table/Table";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import generateColor from "@/helpers/generateColor";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const ApprovedAccounts = () => {
  const dispatch = useDispatch();
  const approvedParentsData = useSelector((state) => state?.proprietor?.getGuardianStatusData.activeList);

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
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Email</div>
      ),
      accessor: "email",
      Cell: (row) => {
        let email = row.cell.row.values.email;
        return <div style={{ width: "15rem" }}>
          <p style={{ color: "#4F4F4F" }}>{email}</p>
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
        >Ward</div>
      ),
      accessor: "wards",
      Cell: (row) => {
        let wards = row.cell.row.values.wards;
        return <div style={{ width: "10rem", display: "flex", flexWrap: "wrap" }}>
          {Array.isArray(wards) && wards.map((ward, index) => {
            return (ward.avatar ? <img style={{ width: "3rem", height: "3rem", borderRadius: "50%", padding: "0.25rem", marginLeft: "-0.625rem", backgroundColor: "white", cursor: "pointer" }} key={index} src={ward} alt="img" /> : ward.firstName && <p style={{ backgroundColor: generateColor(), whiteSpace: "nowrap", border: "1px solid #FF7E3F0D", borderRadius: "50%", fontSize: "1.25rem", width: "3rem", height: "3rem", lineHeight: "3rem", textAlign: "center", marginLeft: "-0.625rem", cursor: "pointer" }}>{ward.firstName && initialsCase(`${ward.firstName} ${ward?.lastName}`)}</p>);
          })}
        </div>;
      }
    },
    // {
    //   Header: () => (
    //     <div
    //       style={{
    //         width: "auto",
    //         color: "#747474",
    //         fontSize: "1rem",
    //         textAlign: "center"
    //       }}
    //     >Action</div>
    //   ),
    //   accessor: "action",
    //   Cell: (row) => {
    //     let data = row.cell.row.original.allData;

    //     return <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
    //       <Button onClick={() => dispatch(showModal({ action: "show", type: "assignWardToParent", modalData: data }))} title="Add New Ward +" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#FF7E3F0D" bordercolor="#FF7E3F0D" />
    //     </div>;
    //   }
    // },
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
            <DropdownToggle style={{ backgroundColor: "transparent" }} name="" className={cx(styles.dropdownToggler)}>
              <Icon style={{ cursor: "pointer" }} icon="bx:dots-vertical-rounded" color="black" />
            </DropdownToggle>
            <DropdownMenu className={cx(styles.dropdownMenuWrapper)}>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "assignWardToParent", modalData: data }))}>Assign Ward</DropdownItem>
              {/* <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "assignBulkWardsToParent", modalData: data }))}>Assign Multiple Wards</DropdownItem> */}
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "deactivateGuardian", modalData: data }))}>Deactivate Guardian</DropdownItem>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "guardianDetails", modalData: data }))}>View Details</DropdownItem>
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
        firstName: item?.firstName && titleCase(item?.firstName),
        lastName: item?.lastName && titleCase(item?.lastName),
        email: item?.email && item?.email,
        action: "",
        wards: item?.wards && item?.wards,
        allData: item
      });
    });
    return result;
  };

  return (
    <TableComponent columnsHeader={columnsHeader} tableData={getTableData(approvedParentsData)} showHeader={true} />
  );
};

export default ApprovedAccounts;