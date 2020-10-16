import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterPage = () => (
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 col-md-4 offset-md-1">
				<div class="register-form">
					<RegisterForm />
				</div>
			</div>
			<div class="col-12 col-md-6 offset-md-1 d-flex">
				<div class="flex-grow-1" />
			</div>
		</div>
	</div>
);

export default RegisterPage;
