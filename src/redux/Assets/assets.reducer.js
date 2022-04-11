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
	MODAL_ASSET_ID_FAILURE  ,

	GENERATED_ASSET_CODES_REQUEST ,
	GENERATED_ASSET_CODES_SUCCESS ,
	GENERATED_ASSET_CODES_FAILURE,
	
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

const initialState = {
	loading : false,
	data: {},
	errorMessage: "",
	error: false,

	lostButFoundAssetsData: {},
	reportFoundAssetsData: {},
	verifyAssetsData: {},
	assetOwnershipHistoryData: {},
	addAssetData: {},
	assetsListData: {},
	modifyAssetData: {},
	deleteAssetData: {},
	transferAssetData: {},
	bulkTransferAssetData: {},
	editAssetTypeData: {},
	modalAssetIdData: {},
	generatedAssetCodesData: {},
	allAssetsTypesData: [],
	chartData: {},
	modalAssetId: "",
	addAssetCategoryData: {},
	modifyAssetCategoryData: {},
	deleteAssetCategoryData: {},
	allMissingAssetsData: {},
	reportMissingAssetData: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	
	case ALL_ASSETS_TYPES_REQUEST:
		return {
			...state,
			loading: true
		};
	case ALL_ASSETS_TYPES_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload,
			allAssetsTypesData: action.payload
		};
	case ALL_ASSETS_TYPES_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case LOST_BUT_FOUND_ASSETS_REQUEST:
		return {
			...state,
			loading: true
		};
	case LOST_BUT_FOUND_ASSETS_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload,
			lostButFoundAssetsData: action.payload
		};
	case LOST_BUT_FOUND_ASSETS_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case REPORT_FOUND_ASSETS_REQUEST:
		return {
			...state,
			loading: true
		};
	case REPORT_FOUND_ASSETS_SUCCESS:
		return {
			...state,
			loading: false,
			reportFoundAssetsData: action.payload
		};
	case REPORT_FOUND_ASSETS_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case VERIFY_ASSETS_REQUEST:
		return {
			...state,
			loading: true
		};
	case VERIFY_ASSETS_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload,
			verifyAssetsData: action.payload
		};
	case VERIFY_ASSETS_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case ASSET_OWNERSHIP_HISTORY_REQUEST:
		return {
			...state,
			loading: true
		};
	case ASSET_OWNERSHIP_HISTORY_SUCCESS:
		return {
			...state,
			loading: false,
			assetOwnershipHistoryData: action.payload
		};
	case ASSET_OWNERSHIP_HISTORY_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case ADD_ASSET_REQUEST:
		return {
			...state,
			loading: true
		};
	case ADD_ASSET_SUCCESS:
		return {
			...state,
			loading: false,
			addAssetData: action.payload
		};
	case ADD_ASSET_FAILURE:
		return {
			...state,
			loading: false,
			error: true,
			errorMessage: action.payload
		};

	case ASSETS_LIST_REQUEST:
		return {
			...state,
			loading: true
		};
	case ASSETS_LIST_SUCCESS:
		return {
			...state,
			loading: false,
			assetsListData: action.payload
		};
	case ASSETS_LIST_FAILURE:
		return {
			...state,
			loading: false,
			assetsListData: action.payload,
			error: true
		};

	case MODIFY_ASSET_REQUEST:
		return {
			...state,
			loading: true
		};
	case MODIFY_ASSET_SUCCESS:
		return {
			...state,
			loading: false,
			modifyAssetData: action.payload
		};
	case MODIFY_ASSET_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case DELETE_ASSET_REQUEST:
		return {
			...state,
			loading: true
		};
	case DELETE_ASSET_SUCCESS:
		return {
			...state,
			loading: false,
			deleteAssetData: action.payload
		};
	case DELETE_ASSET_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case TRANSFER_ASSET_REQUEST:
		return {
			...state,
			loading: true
		};
	case TRANSFER_ASSET_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload,
			transferAssetData: action.payload
		};
	case TRANSFER_ASSET_FAILURE:
		return {
			...state,
			loading: false,
			transferAssetData: action.payload,
			error: true
		};

	case BULK_ASSET_TRANSFER_REQUEST:
		return {
			...state,
			loading: true
		};
	case BULK_ASSET_TRANSFER_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload
		};
	case BULK_ASSET_TRANSFER_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case EDIT_ASSET_TYPE_REQUEST:
		return {
			...state,
			loading: true
		};
	case EDIT_ASSET_TYPE_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload
		};
	case EDIT_ASSET_TYPE_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case MODAL_ASSET_ID_REQUEST:
		return {
			...state,
			loading: true
		};
	case MODAL_ASSET_ID_SUCCESS:
		return {
			...state,
			loading: false,
			modalAssetId: action.payload
		};
	case MODAL_ASSET_ID_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case GENERATED_ASSET_CODES_REQUEST:
		return {
			...state,
			loading: true
		};
	case GENERATED_ASSET_CODES_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload,
			generatedAssetCodesData: action.payload
		};
	case GENERATED_ASSET_CODES_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case CHART_DATA_REQUEST:
		return {
			...state,
			loading: true
		};
	case CHART_DATA_SUCCESS:
		return {
			...state,
			loading: false,
			chartData: action.payload
		};
	case CHART_DATA_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case ADD_ASSET_CATEGORY_REQUEST:
		return {
			...state,
			loading: true
		};
	case ADD_ASSET_CATEGORY_SUCCESS:
		return {
			...state,
			loading: false,
			addAssetCategoryData: action.payload
		};
	case ADD_ASSET_CATEGORY_FAILURE:
		return {
			...state,
			loading: false,
			error: true,
			errorMessage: action.payload
		};

	case MODIFY_ASSET_CATEGORY_REQUEST:
		return {
			...state,
			loading: true
		};
	case MODIFY_ASSET_CATEGORY_SUCCESS:
		return {
			...state,
			loading: false,
			modifyAssetCategoryData: action.payload
		};
	case MODIFY_ASSET_CATEGORY_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case DELETE_ASSET_CATEGORY_REQUEST:
		return {
			...state,
			loading: true
		};
	case DELETE_ASSET_CATEGORY_SUCCESS:
		return {
			...state,
			loading: false,
			deleteAssetCategoryData: action.payload
		};
	case DELETE_ASSET_CATEGORY_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case ALL_MISSING_ASSETS_REQUEST:
		return {
			...state,
			loading: true
		};
	case ALL_MISSING_ASSETS_SUCCESS:
		return {
			...state,
			loading: false,
			allMissingAssetsData: action.payload
		};
	case ALL_MISSING_ASSETS_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case REPORT_MISSING_ASSET_REQUEST:
		return {
			...state,
			loading: true
		};
	case REPORT_MISSING_ASSET_SUCCESS:
		return {
			...state,
			loading: false,
			reportMissingAssetData: action.payload
		};
	case REPORT_MISSING_ASSET_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	default:
		return {
			...state
		};
	}
};

export default reducer;
