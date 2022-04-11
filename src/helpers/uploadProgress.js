import axios from "axios";

const Progress = (data, updateUploadProgress, endpoint,method) => {
	return axios({
		method: method,
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: localStorage.getItem("access")
				? `Bearer ${localStorage.getItem("access")}`
				: ""
		},
		data: data,
		url: `${endpoint}`,
		onUploadProgress: (progressEvent) => {
			const { loaded, total } = progressEvent;
			const progress = (loaded / total) * 100;
			updateUploadProgress(Math.round(progress));
		}
	});

};

export default Progress;


