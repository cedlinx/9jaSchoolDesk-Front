import React, {useMemo} from "react";
import PropTypes from "prop-types";
import TableComponent from "@/components/Table/Table";
import cx from "classnames";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";


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
                           ASSET NAME
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
                           OWNER
					</div>
				),
				accessor: "owner"
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           ASSET CODE
					</div>
				),
				accessor: "assetCode",
				Cell: (row)=>{
					return <div>
						<Icon icon="ci:qr-code-1" color="#D25B5D" />				
					</div>;
				}
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           DATE FOUND
					</div>
				),
				accessor: "dateFound"
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           STATUS
					</div>
				),
				accessor: "status"
			},
			{
				Header: () => (
					<div
						style={{
							minWidth: "10rem"
						}}
					>
                           SERIAL NUMBER
					</div>
				),
				accessor: "serialNumber"
			}
			
		],
		[]
	);

	const data = useMemo(
		() => [
			{
				name: "#0012450",
				owner: "21/11/2017",
				assetCode: "",
				dateFound: "email@email.com",
				status: "",
				serialNumber: "John Doe"
			},
			{
				name: "#0012450",
				owner: "21/11/2017",
				assetCode: "",
				dateFound: "email@email.com",
				status: "",
				serialNumber: "John Doe"
			},
			{
				name: "#0012450",
				owner: "21/11/2017",
				assetCode: "",
				dateFound: "email@email.com",
				status: "",
				serialNumber: "John Doe"
			},
			{
				name: "#0012450",
				owner: "21/11/2017",
				assetCode: "",
				dateFound: "email@email.com",
				status: "",
				serialNumber: "John Doe"
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