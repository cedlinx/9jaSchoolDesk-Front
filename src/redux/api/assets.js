import axios from "@/config/axios";

export const allAssetsTypesApi = async () => {
	const request = await axios.get("asset/types");
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

export const addAssetApi = async (data) => {
	const request = await axios.post("asset/add", data);
	return request;
};

export const assetsListApi =  async (data) => {
	console.log(data, "erere");
	const request = await axios.get(data ? `asset/list?admin=${data.admin}` : "asset/list");
	console.log(request);
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

export const generatedAssetCodesApi =  async () => {
	const request = await axios.get("asset/total/codes");
	return request;
};

export const chartDataApi =  async (data) => {
	console.log(data, "chart request");
	const request = await axios.post("asset/graph/data", data);
	console.log(request, "chart response");
	return request;
};

export const addAssetCategoryApi = async (data) => {
	const request = await axios.post("asset/add/type", data);
	return request;
};

export const modifyAssetCategoryApi =  async (data) => {
	const request = await axios.post("asset/edit/type", data);
	return request;
};

export const deleteAssetCategoryApi =  async (data) => {
	const request = await axios.post("asset/delete/type", data);
	return request;
};

export const allMissingAssetsApi =  async () => {
	// const request = await axios.get("");
	// return request;
};

export const reportMissingAssetApi =  async (data) => {
	// const request = await axios.post("asset/flag/lost", data);
	// return request;
};
