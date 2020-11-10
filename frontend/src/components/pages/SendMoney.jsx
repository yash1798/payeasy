import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

import "../../styles/send-money.css"

import Header from "../functional/Header"
import { sendMoneyWallet } from "../../redux/actions/walletAction"

export class SendMoney extends Component {
	state = {
		amount: "",
		redirect: false,
		renderError: "",
	}

	handleChange = (e) => {
		this.setState({ amount: e.target.value })
	}

	handleSubmit = () => {
		if (this.state.amount.includes(".")) {
			return this.setState({
				renderError: "Enter a correct (integer) amount.",
			})
		}
		if (this.state.amount === "0") {
			this.setState({ renderError: "Cannot Send $0." })
			return setTimeout(() => {
				this.setState({ renderError: false })
			}, 3000)
		}
		if (
			this.state.amount > this.props.userInfo.user.walletBalance ||
			this.state.amount < 0
		) {
			this.setState({ renderError: "Not Enough Balance." })
			return setTimeout(() => {
				this.setState({ renderError: false })
			}, 3000)
		}

		if (typeof parseInt(this.state.amount) === "number") {
			this.props.sendMoneyWallet(this.state.amount)
			return this.setState({ redirect: true })
		}
	}

	renderError = () => {
		if (this.state.renderError) {
			return (
				<div className="error">
					<h3>{this.state.renderError}</h3>
				</div>
			)
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/send-money/enter-number" />
		}
		return (
			<>
				<Header />
				<section className="send-money page">
					<h1>Enter the amount you want to send.</h1>

					<div className="card">
						{this.renderError()}
						<div className="enter-amount">
							<span>$</span>
							<input
								type="number"
								placeholder="Amount"
								value={this.state.amount}
								onChange={(e) => this.handleChange(e)}
							/>
						</div>
					</div>
					<div className="login-btn" onClick={this.handleSubmit}>
						CONTINUE
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
	sendMoneyWallet: (amount) => dispatch(sendMoneyWallet(amount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney)
