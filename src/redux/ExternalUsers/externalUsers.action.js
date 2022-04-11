import { userRolesApi, lostButFoundAssetsApi, reportFoundAssetsApi, verifyAssetsApi, assetOwnershipHistoryApi, addUserApi, assetsListApi, modifyAssetApi, deleteAssetApi, transferAssetApi, bulkAssetTransferApi, editAssetTypeApi } from "../api/externalUsers";
import { toast } from "react-toastify";

import {
	USER_ROLES_REQUEST, 
	USER_ROLES_SUCCESS ,
	USER_ROLES_FAILURE ,

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

	ADD_USER_REQUEST ,
	ADD_USER_SUCCESS ,
	ADD_USER_FAILURE ,

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

	SELECTED_ROWS_REQUEST ,
	SELECTED_ROWS_SUCCESS ,
	SELECTED_ROWS_FAILURE

} from "./externalUsers.types.js";


const userRolesRequest = (payload) => ({
	type: USER_ROLES_REQUEST,
	payload
});
const userRolesSuccess = (response) => ({
	type: USER_ROLES_SUCCESS,
	payload: response
});
const userRolesFailure = (payload) => ({
	type: USER_ROLES_FAILURE,
	payload
});

export const userRoles = (data) => async (dispatch) => {
	try {
		dispatch(userRolesRequest());
		const response = await userRolesApi(data);
		return dispatch(userRolesSuccess(response));
	} catch (e) {
		return dispatch(userRolesFailure(e.response.data.message));
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
		toast.success(response.data.message);
		return dispatch(reportFoundAssetsSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
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
		toast.success(response.data.message);
		return dispatch(assetOwnershipHistorySuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(assetOwnershipHistoryFailure(e.response.data.message));
	}
};

const addUserRequest = (payload) => ({
	type: ADD_USER_REQUEST,
	payload
});
const addUserSuccess = (response) => ({
	type: ADD_USER_SUCCESS,
	payload: response
});
const addUserFailure = (payload) => ({
	type: ADD_USER_FAILURE,
	payload
});

export const addUser = (data) => async (dispatch) => {
	try {
		dispatch(addUserRequest());
		const response = await addUserApi(data);
		toast.success(response.data.message);
		return dispatch(addUserSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(addUserFailure(e.response.data.message));
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

export const assetsList = () => async (dispatch) => {
	try {
		dispatch(assetsListRequest());
		const response = await assetsListApi();
		return dispatch(assetsListSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
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
		toast.error(e.response.data.message);
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

const selectedRowsRequest = (payload) => ({
	type: SELECTED_ROWS_REQUEST,
	payload
});
const selectedRowsSuccess = (response) => ({
	type: SELECTED_ROWS_SUCCESS,
	payload: response
});
const selectedRowsFailure = (payload) => ({
	type: SELECTED_ROWS_FAILURE,
	payload
});

export const selectedRows = (data) => async (dispatch) => {
	try {
		dispatch(selectedRowsRequest());
		return dispatch(selectedRowsSuccess(data));
	} catch (e) {
		toast.warn("An Error Occured, please try again");
		return dispatch(selectedRowsFailure(e.message));
	}
};






