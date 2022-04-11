import axios from "@/config/axios";

export const enable2faApi = async (data) => {
	const request = await axios.post("settings/set2fa", data);
	return request;
};

export const disable2faApi = async (data) => {
	const request = await axios.post("settings/set2fa", data);
	return request;
};

export const changePasswordApi = async (data) => {
	const request = await axios.post("change-password", data);
	return request;
};