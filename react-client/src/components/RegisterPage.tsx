import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterPage = () => (
	<div className="container-fluid">
		<div className="row">
			<div className="col-12 col-md-4 offset-md-1">
				<div className="register-form">
					<RegisterForm />
				</div>
			</div>
			<div className="col-12 col-md-6 offset-md-1 d-flex">
				<div className="flex-grow-1" />
			</div>
		</div>
	</div>
);

export default RegisterPage;
