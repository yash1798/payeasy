export const loaderReducer = (state = {}, action) => {
	const { type } = action
	switch (type) {
		case "START_LOADING":
			return { loading: true }
		case "STOP_LOADING":
			return { loading: false }
		default:
			return state
	}
}
