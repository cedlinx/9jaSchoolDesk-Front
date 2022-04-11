import React, { useCallback, useState } from "react";
import uploadIcon from "@/assets/icons/upload-cloud.svg";
import { useDropzone } from "react-dropzone";
import { PageWrapper, Label } from "./styles";
import { ToastError } from "@/components/Toast";

const UploadComponent = ({
	value,
	label,
	name,
	onChange,
	handleUpload,
	accept,
	background,
	getUploadedData,
	fileDescription,
	...props
}) => {
	const [uploadedFile, setUploadedFile] = useState(null);
	const [errorToastMessage, setErrorToastMessage] = useState("");
	const [errorToastOpen, setErrorToastOpen] = useState(false);

	const onDrop = useCallback(
		async (acceptedFile) => {
			const isValidFileType = accept.includes(acceptedFile[0].type);
			const isValidFileSize = acceptedFile[0].size <= 2000000;
			const isValidFile = isValidFileType && isValidFileSize;

			if (!isValidFile) {
				setErrorToastMessage("Please upload a valid file and a File less than 2MB");
				setErrorToastOpen(true);
			} else {
				setUploadedFile(acceptedFile);
				getUploadedData(acceptedFile);
			}
		},
		[accept]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	return (
		<>
			<Label>{label}</Label>
			<PageWrapper {...getRootProps()} background>
				<input
					{...getInputProps({
						accept: accept
					})}
					name={name}
					onChange={onChange}
				/>
				<img src={uploadIcon} alt="download" />
				{uploadedFile ? (
					<span className="drop-file">
						{uploadedFile[0]?.name} - {(uploadedFile[0]?.size / 1000000).toFixed(3)}MB
					</span>
				) : (
					<span className="drop-file">
            Drop file here or{" "}
						<span className="browse-file" {...getRootProps()}>
              browse
						</span>
					</span>
				)}
				{/* <span className="size-limit">Size limit: 2MB</span> */}
				<span className="size-limit">Size limit: 2MB (pdf, docs or images)</span>
				{/* <span className="size-limit">Upload other document  ( optional )</span> */}
				{fileDescription && <span>{fileDescription}</span> }
			</PageWrapper>
			<ToastError
				message={errorToastMessage}
				isOpen={errorToastOpen}
				close={() => {
					setErrorToastOpen(!errorToastOpen);
				}}
				uploadedFile={uploadedFile}
				isDragActive={isDragActive}
			/>
		</>
	);
};
export default UploadComponent;
