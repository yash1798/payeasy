import React from "react"
import { connect } from "react-redux"

import spinner from "../../assets/Spinner.svg"

const LoaderOpaque = ({ loading }) => {
	console.log(loading)
	if (!loading.loading) {
		return null
	}
	if (loading.loading) {
		return (
			<div className="loader-opaque">
				<img src={spinner} alt="loader" />
			</div>
		)
	}
}

const mapStateToProps = ({ loading }) => ({
	loading,
})

export default connect(mapStateToProps)(LoaderOpaque)
