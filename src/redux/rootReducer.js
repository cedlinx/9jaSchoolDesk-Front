import { combineReducers } from "redux";
import user from "./User/user.reducer";
import billings from "./Billings/billings.reducer";
import modalState from "./ModalState/modalState.reducer";
import notifications from "./Notifications/notifications.reducer";
import assets from "./Assets/assets.reducer";
import redirect from "./Redirect/redirect.reducer";
import externalUsers from "./ExternalUsers/externalUsers.reducer";
import security from "./Security/security.reducer";

const rootReducer = combineReducers({
	user,
	billings,
	modalState,
	notifications,
	assets,
	redirect,
	externalUsers,
	security
});

export default rootReducer;
