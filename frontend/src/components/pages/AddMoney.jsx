import React, { Component } from "react"
import { connect } from "react-redux"

import "../../styles/add-money.css"

import Header from "../functional/Header"
import { addMoneyWallet } from "../../redux/actions/walletAction"

export class AddMoney extends Component {
	state = {
		amount: "",
		errors: "",
	}

	handleChange = (e) => {
		return this.setState({ amount: e.target.value })
	}

	handleSubmit = () => {
		if (this.state.amount.includes(".")) {
			return this.setState({ errors: "Enter a correct (integer) amount." })
		}
		this.props.addMoneyWallet(this.state.amount)
		this.props.history.push("/add-money/credit-card")
	}

	renderError = () => {
		if (this.state.errors) {
			setTimeout(() => {
				this.setState({ errors: "" })
			}, 3000)
			return (
				<div className="error">
					<h3>{this.state.errors}</h3>
				</div>
			)
		}
	}

	render() {
		return (
			<>
				<Header />
				<section className="page add-money ">
					<h1>Add money from your bank account.</h1>
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

const mapDispatchToProps = (dispatch) => ({
	addMoneyWallet: (amount) => dispatch(addMoneyWallet(amount)),
})

export default connect(null, mapDispatchToProps)(AddMoney)
