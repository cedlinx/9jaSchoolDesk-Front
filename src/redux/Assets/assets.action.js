import { allAssetsTypesApi, lostButFoundAssetsApi, reportFoundAssetsApi, verifyAssetsApi, assetOwnershipHistoryApi, addAssetApi, assetsListApi, modifyAssetApi, deleteAssetApi, transferAssetApi, bulkAssetTransferApi, editAssetTypeApi, generatedAssetCodesApi, chartDataApi, addAssetCategoryApi, modifyAssetCategoryApi, deleteAssetCategoryApi, allMissingAssetsApi, reportMissingAssetApi } from "../api/assets";
import { toast } from "react-toastify";

import {
	ALL_ASSETS_TYPES_REQUEST, 
	ALL_ASSETS_TYPES_SUCCESS ,
	ALL_ASSETS_TYPES_FAILURE ,

	LOST_BUT_FOUND_ASSETS_REQUEST ,
	LOST_BUT_FOUND_ASSETS_SUCCESS ,
	LOST_BUT_FOUND_ASSETS_FAILURE ,

	REPORT_FOUND_ASSETS_REQUEST ,
	REPORT_FOUND_ASSETS_SUCCESS ,
	REPORT_FOUND_ASSETS_FAILURE ,

	VERIFY_ASSETS_SUCCESS,
	VERIFY_ASSETS_REQUEST ,
	VERIFY_ASSETS_FAILURE ,

	ASSET_OWNERSHIP_HISTORY_REQUEST ,
	ASSET_OWNERSHIP_HISTORY_SUCCESS ,
	ASSET_OWNERSHIP_HISTORY_FAILURE ,

	ADD_ASSET_REQUEST ,
	ADD_ASSET_SUCCESS ,
	ADD_ASSET_FAILURE ,

	ASSETS_LIST_REQUEST, 
	ASSETS_LIST_SUCCESS ,
	ASSETS_LIST_FAILURE ,

	MODIFY_ASSET_REQUEST ,
	MODIFY_ASSET_SUCCESS ,
	MODIFY_ASSET_FAILURE ,

	DELETE_ASSET_REQUEST ,
	DELETE_ASSET_SUCCESS ,
	DELETE_ASSET_FAILURE ,

	TRANSFER_ASSET_REQUEST, 
	TRANSFER_ASSET_SUCCESS ,
	TRANSFER_ASSET_FAILURE ,

	BULK_ASSET_TRANSFER_REQUEST, 
	BULK_ASSET_TRANSFER_SUCCESS ,
	BULK_ASSET_TRANSFER_FAILURE ,

	EDIT_ASSET_TYPE_REQUEST ,
	EDIT_ASSET_TYPE_SUCCESS ,
	EDIT_ASSET_TYPE_FAILURE,
	
	MODAL_ASSET_ID_REQUEST ,
	MODAL_ASSET_ID_SUCCESS ,
	MODAL_ASSET_ID_FAILURE ,

	GENERATED_ASSET_CODES_REQUEST ,
	GENERATED_ASSET_CODES_SUCCESS ,
	GENERATED_ASSET_CODES_FAILURE ,

	CHART_DATA_REQUEST ,
	CHART_DATA_SUCCESS ,
	CHART_DATA_FAILURE ,

	ADD_ASSET_CATEGORY_REQUEST ,
	ADD_ASSET_CATEGORY_SUCCESS ,
	ADD_ASSET_CATEGORY_FAILURE ,

	MODIFY_ASSET_CATEGORY_REQUEST ,
	MODIFY_ASSET_CATEGORY_SUCCESS ,
	MODIFY_ASSET_CATEGORY_FAILURE ,

	DELETE_ASSET_CATEGORY_REQUEST ,
	DELETE_ASSET_CATEGORY_SUCCESS ,
	DELETE_ASSET_CATEGORY_FAILURE ,

	ALL_MISSING_ASSETS_REQUEST,
	ALL_MISSING_ASSETS_SUCCESS ,
	ALL_MISSING_ASSETS_FAILURE ,

	REPORT_MISSING_ASSET_REQUEST ,
	REPORT_MISSING_ASSET_SUCCESS ,
	REPORT_MISSING_ASSET_FAILURE 

} from "./assets.types.js";


const allAssetsTypesRequest = (payload) => ({
	type: ALL_ASSETS_TYPES_REQUEST,
	payload
});
const allAssetsTypesSuccess = (response) => ({
	type: ALL_ASSETS_TYPES_SUCCESS,
	payload: response
});
const allAssetsTypesFailure = (payload) => ({
	type: ALL_ASSETS_TYPES_FAILURE,
	payload
});

export const allAssetsTypes = (data) => async (dispatch) => {
	try {
		dispatch(allAssetsTypesRequest());
		const response = await allAssetsTypesApi(data);
		return dispatch(allAssetsTypesSuccess(response));
	} catch (e) {
		return dispatch(allAssetsTypesFailure(e.response.data.message));
	}
};


const lostButFoundAssetsRequest = (payload) => ({
	type: LOST_BUT_FOUND_ASSETS_REQUEST,
	payload
});
const lostButFoundAssetsSuccess = (response) => ({
	type: LOST_BUT_FOUND_ASSETS_SUCCESS,
	payload: response
});
const lostButFoundAssetsFailure = (payload) => ({
	type: LOST_BUT_FOUND_ASSETS_FAILURE,
	payload
});

export const lostButFoundAssets = (data) => async (dispatch) => {
	try {
		dispatch(lostButFoundAssetsRequest());
		const response = await lostButFoundAssetsApi(data);
		toast.success(response.data.message);
		return dispatch(lostButFoundAssetsSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(lostButFoundAssetsFailure(e.response.data.message));
	}
};

const reportFoundAssetsRequest = (payload) => ({
	type: REPORT_FOUND_ASSETS_REQUEST,
	payload
});
const reportFoundAssetsSuccess = (response) => ({
	type: REPORT_FOUND_ASSETS_SUCCESS,
	payload: response
});
const reportFoundAssetsFailure = (payload) => ({
	type: REPORT_FOUND_ASSETS_FAILURE,
	payload
});

export const reportFoundAssets = (data) => async (dispatch) => {
	try {
		dispatch(reportFoundAssetsRequest());
		const response = await reportFoundAssetsApi(data);
		return dispatch(reportFoundAssetsSuccess(response));
	} catch (e) {
		toast.error("An Error Occured, Please Try Again");
		return dispatch(reportFoundAssetsFailure(e.response.data.message));
	}
};

const verifyAssetsRequest = (payload) => ({
	type: VERIFY_ASSETS_REQUEST,
	payload
});
const verifyAssetsSuccess = (response) => ({
	type: VERIFY_ASSETS_SUCCESS,
	payload: response
});
const verifyAssetsFailure = (payload) => ({
	type: VERIFY_ASSETS_FAILURE,
	payload
});

export const verifyAssets = (data) => async (dispatch) => {
	try {
		dispatch(verifyAssetsRequest());
		const response = await verifyAssetsApi(data);
		toast.success(response.data.message);
		return dispatch(verifyAssetsSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(verifyAssetsFailure(e.response.data.message));
	}
};

const assetOwnershipHistoryRequest = (payload) => ({
	type: ASSET_OWNERSHIP_HISTORY_REQUEST,
	payload
});
const assetOwnershipHistorySuccess = (response) => ({
	type: ASSET_OWNERSHIP_HISTORY_SUCCESS,
	payload: response
});
const assetOwnershipHistoryFailure = (payload) => ({
	type: ASSET_OWNERSHIP_HISTORY_FAILURE,
	payload
});

export const assetOwnershipHistory = (data) => async (dispatch) => {
	try {
		dispatch(assetOwnershipHistoryRequest());
		const response = await assetOwnershipHistoryApi(data);
		return dispatch(assetOwnershipHistorySuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(assetOwnershipHistoryFailure(e.response.data.message));
	}
};

const addAssetRequest = (payload) => ({
	type: ADD_ASSET_REQUEST,
	payload
});
const addAssetSuccess = (response) => ({
	type: ADD_ASSET_SUCCESS,
	payload: response
});
const addAssetFailure = (payload) => ({
	type: ADD_ASSET_FAILURE,
	payload
});

export const addAsset = (data) => async (dispatch) => {
	try {
		dispatch(addAssetRequest());
		const response = await addAssetApi(data);
		return dispatch(addAssetSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(addAssetFailure(e.response.data.message));
	}
};

const assetsListRequest = (payload) => ({
	type: ASSETS_LIST_REQUEST,
	payload
});
const assetsListSuccess = (response) => ({
	type: ASSETS_LIST_SUCCESS,
	payload: response
});
const assetsListFailure = (payload) => ({
	type: ASSETS_LIST_FAILURE,
	payload
});

export const assetsList = (data) => async (dispatch) => {
	try {
		console.log(data, "hereree");
		dispatch(assetsListRequest());
		const response = await assetsListApi(data);
		console.log(response);
		return dispatch(assetsListSuccess(response));
	} catch (e) {
		toast.error("An Error Occured, please try again");
		return dispatch(assetsListFailure(e.response.data.message));
	}
};

const modifyAssetRequest = (payload) => ({
	type: MODIFY_ASSET_REQUEST,
	payload
});
const modifyAssetSuccess = (response) => ({
	type: MODIFY_ASSET_SUCCESS,
	payload: response
});
const modifyAssetFailure = (payload) => ({
	type: MODIFY_ASSET_FAILURE,
	payload
});

export const modifyAsset = (data) => async (dispatch) => {
	try {
		dispatch(modifyAssetRequest());
		const response = await modifyAssetApi(data);
		toast.success(response.data.message);
		return dispatch(modifyAssetSuccess(response));
	} catch (e) {
		toast.error("An Error Occured, Please try again");
		return dispatch(modifyAssetFailure(e.response.data.message));
	}
};

const deleteAssetRequest = (payload) => ({
	type: DELETE_ASSET_REQUEST,
	payload
});
const deleteAssetSuccess = (response) => ({
	type: DELETE_ASSET_SUCCESS,
	payload: response
});
const deleteAssetFailure = (payload) => ({
	type: DELETE_ASSET_FAILURE,
	payload
});

export const deleteAsset = (data) => async (dispatch) => {
	try {
		dispatch(deleteAssetRequest());
		const response = await deleteAssetApi(data);
		toast.success(response.data.message);
		return dispatch(deleteAssetSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(deleteAssetFailure(e.response.data.message));
	}
};

const transferAssetRequest = (payload) => ({
	type: TRANSFER_ASSET_REQUEST,
	payload
});
const transferAssetSuccess = (response) => ({
	type: TRANSFER_ASSET_SUCCESS,
	payload: response
});
const transferAssetFailure = (payload) => ({
	type: TRANSFER_ASSET_FAILURE,
	payload
});

export const transferAsset = (data) => async (dispatch) => {
	try {
		dispatch(transferAssetRequest());
		const response = await transferAssetApi(data);
		toast.success(response.data.message);
		return dispatch(transferAssetSuccess(response.data));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(transferAssetFailure(e.response.data.message));
	}
};

const bulkAssetTransferRequest = (payload) => ({
	type: BULK_ASSET_TRANSFER_REQUEST,
	payload
});
const bulkAssetTransferSuccess = (response) => ({
	type: BULK_ASSET_TRANSFER_SUCCESS,
	payload: response
});
const bulkAssetTransferFailure = (payload) => ({
	type: BULK_ASSET_TRANSFER_FAILURE,
	payload
});

export const bulkAssetTransfer = (data) => async (dispatch) => {
	try {
		dispatch(bulkAssetTransferRequest());
		const response = await bulkAssetTransferApi(data);
		toast.success(response.data.message);
		return dispatch(bulkAssetTransferSuccess(response));
	} catch (e) {
		toast.warn(e.response.data.message);
		return dispatch(bulkAssetTransferFailure(e.response.data.message));
	}
};

const editAssetTypeRequest = (payload) => ({
	type: EDIT_ASSET_TYPE_REQUEST,
	payload
});
const editAssetTypeSuccess = (response) => ({
	type: EDIT_ASSET_TYPE_SUCCESS,
	payload: response
});
const editAssetTypeFailure = (payload) => ({
	type: EDIT_ASSET_TYPE_FAILURE,
	payload
});

export const editAssetType = (data) => async (dispatch) => {
	try {
		dispatch(editAssetTypeRequest());
		const response = await editAssetTypeApi(data);
		toast.success(response.data.message);
		return dispatch(editAssetTypeSuccess(response));
	} catch (e) {
		toast.warn(e.response.data.message);
		return dispatch(editAssetTypeFailure(e.response.data.message));
	}
};

const modalAssetIdRequest = (payload) => ({
	type: MODAL_ASSET_ID_REQUEST,
	payload
});
const modalAssetIdSuccess = (response) => ({
	type: MODAL_ASSET_ID_SUCCESS,
	payload: response
});
const modalAssetIdFailure = (payload) => ({
	type: MODAL_ASSET_ID_FAILURE,
	payload
});

export const modalAssetId = (data) => async (dispatch) => {
	try {
		dispatch(modalAssetIdRequest());
		return dispatch(modalAssetIdSuccess(data));
	} catch (e) {
		toast.warn("An Error Occured, please try again");
		return dispatch(modalAssetIdFailure(e.message));
	}
};

const generatedAssetCodesRequest = (payload) => ({
	type: GENERATED_ASSET_CODES_REQUEST,
	payload
});
const generatedAssetCodesSuccess = (response) => ({
	type: GENERATED_ASSET_CODES_SUCCESS,
	payload: response
});
const generatedAssetCodesFailure = (payload) => ({
	type: GENERATED_ASSET_CODES_FAILURE,
	payload
});

export const generatedAssetCodes = () => async (dispatch) => {
	try {
		dispatch(generatedAssetCodesRequest());
		const response = await generatedAssetCodesApi();

		return dispatch(generatedAssetCodesSuccess(response));
	} catch (e) {
		toast.warn("An Error Occured, please try again");
		return dispatch(generatedAssetCodesFailure(e.message));
	}
};

const chartDataRequest = (payload) => ({
	type: CHART_DATA_REQUEST,
	payload
});
const chartDataSuccess = (response) => ({
	type: CHART_DATA_SUCCESS,
	payload: response
});
const chartDataFailure = (payload) => ({
	type: CHART_DATA_FAILURE,
	payload
});

export const chartData = (data) => async (dispatch) => {
	try {
		dispatch(chartDataRequest());
		const response = await chartDataApi(data);

		return dispatch(chartDataSuccess(response));
	} catch (e) {
		toast.warn("An Error Occured, please try again");
		return dispatch(chartDataFailure(e.message));
	}
};

const addAssetCategoryRequest = (payload) => ({
	type: ADD_ASSET_CATEGORY_REQUEST,
	payload
});
const addAssetCategorySuccess = (response) => ({
	type: ADD_ASSET_CATEGORY_SUCCESS,
	payload: response
});
const addAssetCategoryFailure = (payload) => ({
	type: ADD_ASSET_CATEGORY_FAILURE,
	payload
});

export const addAssetCategory = (data) => async (dispatch) => {
	try {
		dispatch(addAssetCategoryRequest());
		const response = await addAssetCategoryApi(data);
		toast.success(response.data.message);
		return dispatch(addAssetCategorySuccess(response));
	} catch (e) {
		toast.error("An error occured, please try again");
		return dispatch(addAssetCategoryFailure(e.response.data.message));
	}
};

const modifyAssetCategoryRequest = (payload) => ({
	type: MODIFY_ASSET_CATEGORY_REQUEST,
	payload
});
const modifyAssetCategorySuccess = (response) => ({
	type: MODIFY_ASSET_CATEGORY_SUCCESS,
	payload: response
});
const modifyAssetCategoryFailure = (payload) => ({
	type: MODIFY_ASSET_CATEGORY_FAILURE,
	payload
});

export const modifyAssetCategory = (data) => async (dispatch) => {
	try {
		dispatch(modifyAssetCategoryRequest());
		const response = await modifyAssetCategoryApi(data);
		toast.success(response.data.message);
		return dispatch(modifyAssetCategorySuccess(response));
	} catch (e) {
		toast.error("An Error Occured, Please try again");
		return dispatch(modifyAssetCategoryFailure(e.response.data.message));
	}
};

const deleteAssetCategoryRequest = (payload) => ({
	type: DELETE_ASSET_CATEGORY_REQUEST,
	payload
});
const deleteAssetCategorySuccess = (response) => ({
	type: DELETE_ASSET_CATEGORY_SUCCESS,
	payload: response
});
const deleteAssetCategoryFailure = (payload) => ({
	type: DELETE_ASSET_CATEGORY_FAILURE,
	payload
});

export const deleteAssetCategory = (data) => async (dispatch) => {
	try {
		dispatch(deleteAssetCategoryRequest());
		const response = await deleteAssetCategoryApi(data);
		toast.success(response.data.message);
		return dispatch(deleteAssetCategorySuccess(response));
	} catch (e) {
		toast.error("An error occured, please try again");
		return dispatch(deleteAssetCategoryFailure(e.response.data.message));
	}
};

const allMissingAssetsRequest = (payload) => ({
	type: ALL_MISSING_ASSETS_REQUEST,
	payload
});
const allMissingAssetsSuccess = (response) => ({
	type: ALL_MISSING_ASSETS_SUCCESS,
	payload: response
});
const allMissingAssetsFailure = (payload) => ({
	type: ALL_MISSING_ASSETS_FAILURE,
	payload
});

export const allMissingAssets = (data) => async (dispatch) => {
	try {
		dispatch(allMissingAssetsRequest());
		const response = await allMissingAssetsApi(data);
		toast.success(response.data.message);
		return dispatch(allMissingAssetsSuccess(response));
	} catch (e) {
		toast.error("An error occured, please try again");
		return dispatch(allMissingAssetsFailure(e.response.data.message));
	}
};

const reportMissingAssetRequest = (payload) => ({
	type: REPORT_MISSING_ASSET_REQUEST,
	payload
});
const reportMissingAssetSuccess = (response) => ({
	type: REPORT_MISSING_ASSET_SUCCESS,
	payload: response
});
const reportMissingAssetFailure = (payload) => ({
	type: REPORT_MISSING_ASSET_FAILURE,
	payload
});

export const reportMissingAsset = (data) => async (dispatch) => {
	try {
		dispatch(reportMissingAssetRequest());
		const response = await reportMissingAssetApi(data);
		toast.success(response.data.message);
		return dispatch(reportMissingAssetSuccess(response));
	} catch (e) {
		toast.error("An error occured, please try again");
		return dispatch(reportMissingAssetFailure(e.response.data.message));
	}
};




