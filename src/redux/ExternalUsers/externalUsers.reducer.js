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
  MODAL_ASSET_ID_FAILURE  ,

  SELECTED_ROWS_REQUEST ,
  SELECTED_ROWS_SUCCESS ,
  SELECTED_ROWS_FAILURE  

} from "./externalUsers.types.js";

const initialState = {
  loading: false,

  data: {},

  errorMessage: "",
  error: false,
  
  addUserData: [],
  modalUserId: "",
  userRolesData: []
	
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
	
  case USER_ROLES_REQUEST:
    return {
      ...state,
      loading: true
    };
  case USER_ROLES_SUCCESS:
    return {
      ...state,
      loading: false,
      userRolesData: action.payload.data
    };
  case USER_ROLES_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case LOST_BUT_FOUND_ASSETS_REQUEST:
    return {
      ...state,
      lostButFoundAssetsLoading: true
    };
  case LOST_BUT_FOUND_ASSETS_SUCCESS:
    return {
      ...state,
      lostButFoundAssetsLoading: false,
      lostButFoundAssetsSuccess: true,
      data: action.payload,
      lostButFoundAssetsData: action.payload
    };
  case LOST_BUT_FOUND_ASSETS_FAILURE:
    return {
      ...state,
      lostButFoundAssetsLoading: false,
      lostButFoundAssetsSuccess: false,
      error: true
    };

  case REPORT_FOUND_ASSETS_REQUEST:
    return {
      ...state,
      reportFoundAssetsLoading: true
    };
  case REPORT_FOUND_ASSETS_SUCCESS:
    return {
      ...state,
      reportFoundAssetsLoading: false,
      reportFoundAssetsSuccess: true,
      data: action.payload,
      reportFoundAssetsData: action.payload
    };
  case REPORT_FOUND_ASSETS_FAILURE:
    return {
      ...state,
      reportFoundAssetsLoading: false,
      reportFoundAssetsSuccess: false,
      error: true
    };

  case VERIFY_ASSETS_REQUEST:
    return {
      ...state,
      verifyAssetsLoading: true
    };
  case VERIFY_ASSETS_SUCCESS:
    return {
      ...state,
      verifyAssetsLoading: false,
      verifyAssetsSuccess: true,
      data: action.payload,
      verifyAssetsData: action.payload
    };
  case VERIFY_ASSETS_FAILURE:
    return {
      ...state,
      verifyAssetsLoading: false,
      verifyAssetsSuccess: false,
      error: true
    };

  case ASSET_OWNERSHIP_HISTORY_REQUEST:
    return {
      ...state,
      assetOwnershipHistoryLoading: true
    };
  case ASSET_OWNERSHIP_HISTORY_SUCCESS:
    return {
      ...state,
      assetOwnershipHistoryLoading: false,
      assetOwnershipHistorySuccess: true,
      data: action.payload
    };
  case ASSET_OWNERSHIP_HISTORY_FAILURE:
    return {
      ...state,
      assetOwnershipHistoryLoading: false,
      assetOwnershipHistorySuccess: false,
      error: true
    };

  case ADD_USER_REQUEST:
    return {
      ...state,
      loading: true
    };
  case ADD_USER_SUCCESS:
    return {
      ...state,
      loading: false,
      data: action.payload,
      addUserData: action.payload.data
    };
  case ADD_USER_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case ASSETS_LIST_REQUEST:
    return {
      ...state,
      assetsListLoading: true
    };
  case ASSETS_LIST_SUCCESS:
    return {
      ...state,
      assetsListLoading: false,
      assetsListSuccess: true,
      data: action.payload,
      assetsListData: action.payload
    };
  case ASSETS_LIST_FAILURE:
    return {
      ...state,
      assetsListLoading: false,
      assetsListSuccess: false,
      assetsListData: action.payload,
      error: true
    };

  case MODIFY_ASSET_REQUEST:
    return {
      ...state,
      modifyAssetLoading: true
    };
  case MODIFY_ASSET_SUCCESS:
    return {
      ...state,
      modifyAssetLoading: false,
      modifyAssetSuccess: true,
      data: action.payload
    };
  case MODIFY_ASSET_FAILURE:
    return {
      ...state,
      modifyAssetLoading: false,
      modifyAssetSuccess: false,
      error: true
    };

  case DELETE_ASSET_REQUEST:
    return {
      ...state,
      deleteAssetLoading: true
    };
  case DELETE_ASSET_SUCCESS:
    return {
      ...state,
      deleteAssetLoading: false,
      deleteAssetSuccess: true,
      data: action.payload
    };
  case DELETE_ASSET_FAILURE:
    return {
      ...state,
      deleteAssetLoading: false,
      deleteAssetSuccess: false,
      error: true
    };

  case TRANSFER_ASSET_REQUEST:
    return {
      ...state,
      transferAssetLoading: true
    };
  case TRANSFER_ASSET_SUCCESS:
    return {
      ...state,
      transferAssetLoading: false,
      transferAssetSuccess: true,
      data: action.payload,
      transferAssetData: action.payload
    };
  case TRANSFER_ASSET_FAILURE:
    return {
      ...state,
      transferAssetLoading: false,
      transferAssetSuccess: false,
      transferAssetData: action.payload,
      error: true
    };

  case BULK_ASSET_TRANSFER_REQUEST:
    return {
      ...state,
      bulkAssetTransferLoading: true
    };
  case BULK_ASSET_TRANSFER_SUCCESS:
    return {
      ...state,
      bulkAssetTransferLoading: false,
      bulkAssetTransferSuccess: true,
      data: action.payload
    };
  case BULK_ASSET_TRANSFER_FAILURE:
    return {
      ...state,
      bulkAssetTransferLoading: false,
      bulkAssetTransferSuccess: false,
      error: true
    };

  case EDIT_ASSET_TYPE_REQUEST:
    return {
      ...state,
      editAssetTypeLoading: true
    };
  case EDIT_ASSET_TYPE_SUCCESS:
    return {
      ...state,
      editAssetTypeLoading: false,
      editAssetTypeSuccess: true,
      data: action.payload
    };
  case EDIT_ASSET_TYPE_FAILURE:
    return {
      ...state,
      editAssetTypeLoading: false,
      editAssetTypeSuccess: false,
      error: true
    };

  case MODAL_ASSET_ID_REQUEST:
    return {
      ...state,
      modalAssetIdLoading: true
    };
  case MODAL_ASSET_ID_SUCCESS:
    return {
      ...state,
      modalAssetIdLoading: false,
      modalAssetIdSuccess: true,
      modalAssetId: action.payload
    };
  case MODAL_ASSET_ID_FAILURE:
    return {
      ...state,
      modalAssetIdLoading: false,
      modalAssetIdSuccess: false,
      error: true
    };

  case SELECTED_ROWS_REQUEST:
    return {
      ...state,
      selectedRowsLoading: true
    };
  case SELECTED_ROWS_SUCCESS:
    return {
      ...state,
      selectedRowsLoading: false,
      selectedRowsSuccess: true,
      data: action.payload,
      selectedRowsData: action.payload
    };
  case SELECTED_ROWS_FAILURE:
    return {
      ...state,
      selectedRowsLoading: false,
      selectedRowsSuccess: false,
      error: true
    };

  default:
    return {
      ...state
    };
  }
};

export default reducer;
