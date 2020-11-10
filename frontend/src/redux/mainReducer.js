import { combineReducers } from "redux"

import { userReducer } from "./reducers/userReducer"
import { walletReducer } from "./reducers/walletReducer"
import { loaderReducer } from "./reducers/loadingReducer"

const reducer = combineReducers({
	userInfo: userReducer,
	walletInfo: walletReducer,
	loading: loaderReducer,
})

export default reducer
