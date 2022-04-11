import axios from "@/config/axios";

export const userRolesApi = async () => {
	const request = await axios.get("user/roles");
	return request;
};

export const lostButFoundAssetsApi = async () => {
	const request = await axios.get("lost-but-found/assets");
	return request;
};

export const reportFoundAssetsApi = async (data) => {
	const request = await axios.post("report/found/asset", data);
	return request;
};

export const verifyAssetsApi = async (data) => {
	const request = await axios.post("find/asset", data);
	return request;
};

export const assetOwnershipHistoryApi =  async (data) => {
	const request = await axios.post("asset/history", data);
	return request;
};

export const addUserApi = async (data) => {
	const request = await axios.post("add/company/user", data);
	return request;
};

export const assetsListApi =  async () => {
	const request = await axios.get("asset/list");
	return request;
};

export const modifyAssetApi =  async (data) => {
	const request = await axios.post("asset/modify", data);
	return request;
};

export const deleteAssetApi =  async (data) => {
	const request = await axios.post("asset/delete", data);
	return request;
};

export const transferAssetApi =  async (data) => {
	const request = await axios.post("asset/transfer", data);
	return request;
};

export const bulkAssetTransferApi =  async (data) => {
	const request = await axios.post("asset/import", data);
	return request;
};

export const editAssetTypeApi =  async (data) => {
	const request = await axios.post("asset/edit/type", data);
	return request;
};
