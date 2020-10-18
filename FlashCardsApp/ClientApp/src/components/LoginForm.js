import React, { useContext } from 'react';
import useFormProcessor from '../hooks/useFormProcessor';

import { useHistory } from 'react-router-dom';
import { setCookie } from '../utils/cookie';
import { loginUser } from '../services/users.service';
import { Context } from '../providers/global-context.provider';

import { getEmptyInputsErrorsObject } from '../utils/errors/auth';
import ErrorMessage from './ErrorMessage';

const initialUser = {
	username: '',
	password: ''
};

const LoginForm = () => {
	const { data, errors, setErrors, handleChange, handleSubmit } = useFormProcessor(initialUser, initialUser);
	const { toggleLoggedIn, saveUser } = useContext(Context);
	const history = useHistory();

	const getErrors = () => {
		const { username, password } = data;
		return getEmptyInputsErrorsObject({ username, password });
	};

	const handleSignIn = async () => {
		const result = await loginUser({ ...data });
		if (result.token) {
			saveUser(result.user);
			setCookie('x-auth-token', result.token);
			setErrors(initialUser);
			toggleLoggedIn(true);
			history.push('/user/decks');
		} else {
			setErrors({ ...errors, password: 'Invalid username or password' });
		}
	};
	return (
		<form className="bg-white rounded mt-5" onSubmit={(e) => handleSubmit(e, getErrors(), handleSignIn)}>
			<h2 className="mb-4 mt-0 text-center">Login</h2>
			<div className="form-group">
				<input
					className="form-control"
					type="text"
					name="username"
					value={data.username}
					placeholder="Username"
					onChange={handleChange}
				/>
				{errors.username ? <ErrorMessage text={errors.username} /> : null}
			</div>
			<div className="form-group">
				<input
					className="form-control"
					type="password"
					name="password"
					value={data.password}
					placeholder="Password"
					onChange={handleChange}
				/>
				{errors.password ? <ErrorMessage text={errors.password} /> : null}
			</div>
			<div className="form-group">
				<input type="submit" className="btn btn-info btn-lg btn-block" value="Sign In" />
			</div>
		</form>
	);
};

export default LoginForm;
