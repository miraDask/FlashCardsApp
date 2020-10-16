import React from 'react';

const RegisterForm = () => {
	return (
		<form action="#" className="bg-white rounded">
			<h2 className="mb-4 mt-0 text-center">Register</h2>
			<div className="form-group">
				<input type="text" className="form-control" placeholder="Username" />
			</div>
			<div className="form-group">
				<input type="text" className="form-control" placeholder="Password" />
			</div>
			<div className="form-group">
				<input type="text" className="form-control" placeholder="Confirm Password" />
			</div>
			<div className="form-group">
				<input type="submit" className="btn btn-info btn-lg btn-block" value="Submit" />
			</div>
		</form>
	);
};

export default RegisterForm;
