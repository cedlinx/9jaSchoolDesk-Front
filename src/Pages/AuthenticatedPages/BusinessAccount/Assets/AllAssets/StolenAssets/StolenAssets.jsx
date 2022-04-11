import React, {useMemo} from "react";
import PropTypes from "prop-types";
import TableComponent from "@/components/Table/Table";
import cx from "classnames";
// import styles from "./StolenAssets.module.scss";
import Button from "@/components/Button/Button";


const StolenAssets = props => {

	const columns = useMemo(
		() => [
			{
				Header: () => (
					<div
						style={{
							width: "10rem"
						}}
					>
                           USER ID
					</div>
				),
				accessor: "userID"				
			},
                
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           DATE
					</div>
				),
				accessor: "date"
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           NAME
					</div>
				),
				accessor: "name"
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           EMAIL ADDRESS
					</div>
				),
				accessor: "email"
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           USER TYPE
					</div>
				),
				accessor: "userType"
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           PHONE NUMBER
					</div>
				),
				accessor: "phone"
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           LOCATION
					</div>
				),
				accessor: "location"
			},
			{
				Header: "ACTIONS",
				accessor: "actions",
				Cell: (row)=>{
					let assetId = row.cell.row.values.nameId;
					return <div onClick={()=>showDetails(assetId)}>
						<Button  title="View" borderRadiusType="lowRounded" textColor="#2C0085" bgColor="rgba(44,0,133,0.05)"/>
					</div>;
				}
			}
		],
		[]
	);

	const data = useMemo(
		() => [
			{
				userID: "#0012450",
				date: "21/11/2017",
				name: "John Doe",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012451",
				date: "21/11/2017",
				name: "John Doe1",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012452",
				date: "21/11/2017",
				name: "John Doe2",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012453",
				date: "21/11/2017",
				name: "John Doe3",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012450",
				date: "21/11/2017",
				name: "John Doe",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012451",
				date: "21/11/2017",
				name: "John Doe1",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012452",
				date: "21/11/2017",
				name: "John Doe2",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012453",
				date: "21/11/2017",
				name: "John Doe3",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012450",
				date: "21/11/2017",
				name: "John Doe",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012451",
				date: "21/11/2017",
				name: "John Doe1",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012452",
				date: "21/11/2017",
				name: "John Doe2",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			},
			{
				userID: "#0012453",
				date: "21/11/2017",
				name: "John Doe3",
				email: "email@email.com",
				userType: "Customer",
				phone: "0801111111",
				location: "lagos",
				action: ""
			}
			
		],
		[]
	);
    
	return (
		<TableComponent columns={columns} data={data} />
	);
};

StolenAssets.propTypes = {
    
};

export default StolenAssets;