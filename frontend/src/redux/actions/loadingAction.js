export const startLoading = () => async (dispatch) => {
	dispatch({
		type: "START_LOADING",
	})
}

export const stopLoading = () => async (dispatch) => {
	dispatch({
		type: "STOP_LOADING",
	})
}
