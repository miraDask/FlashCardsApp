import React, { Component } from 'react';
import LoginForm from './LoginForm';
import '../custom.css';
export class Home extends Component {
	static displayName = Home.name;

	render() {
		return (
			<div className="row align-items-center justify-content-center">
				<div className="col-md-6">
					<h2 className="heading mb-3">Flash your memory with our app</h2>
					<div className="sub-heading">
						<p className="mb-4">Create flash cards, save them in decks and start learning.</p>
					</div>
				</div>
				<div className="col-md-1" />
				<div className="col-md-5 relative align-self-center">
					<LoginForm />
				</div>
			</div>
		);
	}
}
