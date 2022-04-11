import axios from "@/config/axios";

export const allNotificationsDetailsApi = async () => {
	const request = await axios.get("notification/get/detail");
	return request;
};

export const notificationSummaryApi = async () => {
	const request = await axios.get("notification/get/summary");
	return request;
};

export const allReadNotificationsApi = async () => {
	const request = await axios.get("notification/get/read");
	return request;
};

export const allUnreadNotificationsApi = async () => {
	const request = await axios.get("notification/get/unread");
	return request;
};

export const markAllAsReadApi =  async () => {
	const request = await axios.put("notification/mark/read/all");
	return request;
};

export const markAllAsUnreadApi = async () => {
	const request = await axios.put("notification/mark/unread/all");
	return request;
};

export const markSingleAsReadApi =  async () => {
	const request = await axios.put("notification/mark/read");
	return request;
};

export const markSingleAsUnreadApi =  async () => {
	const request = await axios.put("notification/mark/unread");
	return request;
};

export const disableNotificationsApi =  async () => {
	const request = await axios.put("notification/disable");
	return request;
};

export const enableNotificationsApi =  async () => {
	const request = await axios.put("notification/enable");
	return request;
};

