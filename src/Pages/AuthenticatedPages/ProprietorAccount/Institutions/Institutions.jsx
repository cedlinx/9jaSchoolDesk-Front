import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Institutions.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import AddInstitutionModal from "@/components/Modals/AddInstitution/AddInstitution";
// import InstitutionStatusModal from "@/components/Modals/InstitutionStatus/InstitutionStatus";
import DeleteInstitutionModal from "@/components/Modals/DeleteInstitution/DeleteInstitution";
import ModifyInstitutionModal from "@/components/Modals/ModifyInstitution/ModifyInstitution";
import ViewInstitutionDetailsModal from "@/components/Modals/ViewInstitutionDetails/ViewInstitutionDetails";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import useGetAllInstitutions from "@/utils/useGetAllInstitutions";


const Institutions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.proprietor.loading);

  const allInstitutionsData = useGetAllInstitutions();
  console.log(allInstitutionsData);

  const columnsHeader = [
    {
      Header: () => (
        <div
          style={{
            width: "2rem",
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
            width: "10rem",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Name </div>
      ),
      accessor: "name",
      Cell: (row) => {
        let name = row.cell.row.values.name;
        return <div style={{ color: "#4F4F4F" }}>
          {name && (name)}
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
        >Phone</div>
      ),
      accessor: "phone",
      Cell: (row) => {
        let phone = row.cell.row.values.phone;
        return <div  >
          <p style={{ color: "#4F4F4F" }}>{phone}</p>
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
        />
      ),
      accessor: "moreOptions",
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
              <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "viewInstitutionDetails", modalData: data }))}><Icon icon="carbon:view" color="#828282" /> View Details</DropdownItem>
              {/* <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "assignSubjectsToInstitution", modalData: data }))}><Icon icon="ep:edit" color="#828282" /> Assign Subject(s)</DropdownItem> */}
              {/* <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "assignInstitutionToClass", modalData: {data, category: "institution"} }))}><Icon icon="ep:edit" color="#828282" /> Assign As Class Institution</DropdownItem> */}
              <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "modifyInstitution", modalData: data }))}><Icon icon="ep:edit" color="#828282" /> Edit Institution</DropdownItem>
              <DropdownItem style={{ color: "#fb4e4e" }} onClick={() => dispatch(showModal({ action: "show", type: "deleteInstitution", modalData: data }))}> <Icon icon="fluent:delete-20-regular" color="#fb4e4e" /> Delete Institution</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result = [];
    Array.isArray(data) && data.map((item, index) => {
      result.push({
        serialNumber: index + 1,
        name: `${item?.name && (item?.name)}`,
        email: item?.email && item?.email,
        action: "",
        status: item?.status && item?.status,
        phone: item?.phone && item?.phone,
        allData: item
      });
    });
    return result;
  };

  return (
    <div className={cx(styles.institutionsHomeContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Institutions</h3>
        <Button onClick={() => dispatch(showModal({ action: "show", type: "addInstitution" }))} type title="Add Institution" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.tableSection)}>
          {loading ? <TableSkeleton /> : Array.isArray(allInstitutionsData) && allInstitutionsData.length > 0 ? <TableComponent loading={loading} columnsHeader={columnsHeader} tableData={getTableData(allInstitutionsData)} showHeader={true} showPagination={true} /> : <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: "1rem"}}>
            <p style={{color: "#747474", fontSize: "1.5rem"}}>No Institution Found. Kindly Add A New Institution</p>
            <Button onClick={() => dispatch(showModal({ action: "show", type: "addInstitution" }))} type title="Add Institution" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
          </div>}
        </div>

      </div>

      {modalState === "show" && modalType === "addInstitution" && <Modal show size="lg" ><AddInstitutionModal /> </Modal>}
      {modalState === "show" && modalType === "modifyInstitution" && <Modal show ><ModifyInstitutionModal /> </Modal>}
      {modalState === "show" && modalType === "viewInstitutionDetails" && <Modal show size="md" ><ViewInstitutionDetailsModal /> </Modal>}
      {modalState === "show" && modalType === "deleteInstitution" && <Modal show ><DeleteInstitutionModal /> </Modal>}    
      {/* {modalState === "show" && modalType === "deactivateInstitution" && <Modal show ><InstitutionStatusModal /> </Modal>}      */}
      {/* {modalState === "show" && modalType === "activateInstitution" && <Modal show size="md" ><InstitutionStatusModal /> </Modal>}  */}
      

    </div>
  );
};

export default Institutions;