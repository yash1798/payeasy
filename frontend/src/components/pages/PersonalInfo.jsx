import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Header from "../functional/Header"
import fetchCall from "../../utils/fetchCall"

import "../../styles/personal-info.css"
import name from "../../assets/cvv-name.svg"
import user from "../../assets/user.svg"
import padlock from "../../assets/padlock.svg"
import phone from "../../assets/phone.svg"

import { startLoading, stopLoading } from "../../redux/actions/loadingAction"

export class PersonalInfo extends Component {
	state = {
		name: "",
		tel_number: "",
		email: "",
		password: "",
		errors: "",
		redirect: false,
	}

	handleChange = (input, e) => {
		return this.setState({ [input]: e.target.value })
	}

	async componentDidMount() {
		this.props.startLoading()

		const data = await fetchCall(
			"user/getUser",
			"GET",
			this.props.userInfo.user.token
		)

		this.props.stopLoading()

		if (data.status === "success") {
			return this.setState({
				name: data.payload.name,
				email: data.payload.email,
				tel_number: data.payload.tel_number,
			})
		}
	}

	handleSubmit = async () => {
		const { email, password, name, tel_number } = this.state

		this.props.startLoading()

		const data = await fetchCall(
			"user/updateUser",
			"PUT",
			this.props.userInfo.user.token,
			{ email, name, password, tel_number }
		)

		this.props.stopLoading()

		if (data.status === "success") {
			return this.setState({ redirect: true })
		}

		if (data.status === "fail") {
			return this.setState({ errors: data.payload })
		}
	}

	renderError = () => {
		if (this.state.errors) {
			setTimeout(() => this.setState({ errors: "" }), 3000)
			return (
				<div className="error">
					<h3>{this.state.errors}</h3>
				</div>
			)
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />
		}
		return (
			<>
				<Header />
				<section className="personal-info page">
					<h1>Edit your Info.</h1>
					<div className="card">
						{this.renderError()}
						<div className="input">
							<img src={name} alt="credit" />
							<input
								value={this.state.name}
								onChange={(e) => this.handleChange("name", e)}
								type="text"
								placeholder="Name"
							/>
						</div>
						<div className="input">
							<img src={user} alt="credit" />
							<input
								value={this.state.email}
								onChange={(e) => this.handleChange("email", e)}
								type="email"
								placeholder="Email"
							/>
						</div>
						<div className="input">
							<img src={padlock} alt="credit" />
							<input
								value={this.state.password}
								onChange={(e) => this.handleChange("password", e)}
								type="password"
								placeholder="Password"
							/>
						</div>
						<div className="input">
							<img src={phone} alt="phone" />
							<input
								value={this.state.tel_number}
								onChange={(e) => this.handleChange("tel_number", e)}
								type="number"
								placeholder="Phone Number"
							/>
						</div>
					</div>
					<div className="login-btn" onClick={this.handleSubmit}>
						UPDATE
					</div>
				</section>
			</>
		)
	}
}

const mapStateToProps = ({ userInfo }) => ({
	userInfo,
})

const mapDispatchToProps = (dispatch) => ({
	startLoading: () => dispatch(startLoading()),
	stopLoading: () => dispatch(stopLoading()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)
