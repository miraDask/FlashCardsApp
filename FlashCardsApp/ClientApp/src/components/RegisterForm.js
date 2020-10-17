import React, { useContext } from 'react';
import useFormProcessor from '../hooks/useFormProcessor';
import { useHistory } from 'react-router-dom';
import { setCookie } from '../utils/cookie';
import { registerUser } from '../services/users.service';
import { Context } from '../providers/global-context.provider';
import { validatePassword, validateConfirmPassword, validateUsername } from '../utils/validations/auth';

import { getServerErrorsObject, getEmptyInputsErrorsObject } from '../utils/errors/auth';
import ErrorMessage from './ErrorMessage';

const initialUser = {
	username: '',
	password: '',
	confirmPassword: ''
};

const RegisterForm = () => {
	const { data, errors, setErrors, handleChange, handleOnBlur, handleSubmit } = useFormProcessor({}, initialUser);
	const { toggleLoggedIn, saveUser } = useContext(Context);
	const history = useHistory();

	const handleSignUp = async () => {
		const { username, password } = data;
		const result = await registerUser({ username, password });

		if (result.token) {
			saveUser(username);
			setCookie('x-auth-token', result.token);
			toggleLoggedIn(true);
			setErrors(initialUser);
			history.push('/user/decks');
		} else {
			const errorsObject = getServerErrorsObject(result);
			setErrors({ ...errors, ...errorsObject });
		}
	};

	return (
		<form
			className="bg-white rounded"
			onSubmit={(e) => handleSubmit(e, getEmptyInputsErrorsObject({ ...data }), handleSignUp)}
		>
			<h2 className="mb-4 mt-0 text-center">Register</h2>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Username"
					value={data.username}
					name="username"
					onBlur={(event) => handleOnBlur(event, validateUsername, { username: data.username })}
					onChange={handleChange}
				/>
				{errors.username ? <ErrorMessage text={errors.username} /> : null}
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					value={data.password}
					name="password"
					onBlur={(event) => handleOnBlur(event, validatePassword, { password: data.password })}
					onChange={handleChange}
				/>
				{errors.password ? <ErrorMessage text={errors.password} /> : null}
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Confirm Password"
					value={data.confirmPassword}
					name="confirmPassword"
					onBlur={(event) =>
						handleOnBlur(event, validateConfirmPassword, {
							password: data.password,
							confirmPassword: data.confirmPassword
						})}
					onChange={handleChange}
				/>
				{errors.confirmPassword ? <ErrorMessage text={errors.confirmPassword} /> : null}
			</div>
			<div className="form-group">
				<input type="submit" className="btn btn-info btn-lg btn-block" value="Submit" />
			</div>
		</form>
	);
};

export default RegisterForm;
