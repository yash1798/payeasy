import { createStore, applyMiddleware } from "redux"

import reducer from "./mainReducer"

const thunk = require("redux-thunk").default

if (localStorage.getItem("user")) {
	var userInfo = {
		user: JSON.parse(localStorage.getItem("user")),
		loggedIn: true,
	}
} else {
	userInfo = {
		user: {},
		loggedIn: false,
	}
}

const wallet = JSON.parse(localStorage.getItem("wallet"))

if (!wallet) {
	var walletInfo = {
		addMoney: null,
		sendMoney: null,
	}
}

if (wallet) {
	walletInfo = {
		addMoney: wallet.addMoney,
		sendMoney: wallet.sendMoney,
	}
}

const initialState = { userInfo, walletInfo, loading: false }

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store
