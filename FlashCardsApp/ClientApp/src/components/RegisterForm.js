import React from 'react';

const RegisterForm = () => {
	return (
		<form action="#" className="bg-white rounded pb_form_v1">
			<h2 className="mb-4 mt-0 text-center">Register</h2>
			<div className="form-group">
				<input type="text" className="form-control pb_height-50 reverse" placeholder="Username" />
			</div>
			<div className="form-group">
				<input type="text" className="form-control pb_height-50 reverse" placeholder="Password" />
			</div>
			<div className="form-group">
				<input type="text" className="form-control pb_height-50 reverse" placeholder="Confirm Password" />
			</div>
			<div className="form-group">
				<input
					type="submit"
					className="btn btn-primary btn-lg btn-block pb_btn-pill  btn-shadow-blue"
					value="Submit"
				/>
			</div>
		</form>
	);
};

export default RegisterForm;
