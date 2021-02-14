import React, { useEffect } from 'react';
import useFormProcessor from '../hooks/useFormProcessor';

import { getEmptyInputsErrorsObject } from '../utils/errors/cards';
import { validateTerm, validateDefinition } from '../utils/validations/cards';

import Form from 'react-bootstrap/Form';

import ErrorMessage from './ErrorMessage';

const initialCard = {
	term: '',
	definition: ''
};

const CardForm = ({ handleFetchData, successFunc, children, card = null }) => {
	const { data, errors, setData, handleChange, setErrors, handleSubmit, handleOnBlur } = useFormProcessor(
		initialCard
	);

	useEffect(
		() => {
			if (card) {
				setData(card);
			}
		},
		[ card, setData ]
	);

	const handleFetchAsync = async () => {
		const success = await handleFetchData(data);
		if (success) {
			successFunc();
			setErrors({ term: '', definition: '' });
		}
	};

	return (
		<Form onSubmit={(e) => handleSubmit(e, getEmptyInputsErrorsObject({ ...data }), handleFetchAsync)}>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Term"
					name="term"
					defaultValue={data.term}
					onBlur={(event) => handleOnBlur(event, validateTerm, { term: data.term })}
					onChange={handleChange}
				/>
				{errors.term ? <ErrorMessage text={errors.term} /> : null}
			</Form.Group>
			<Form.Group>
				<Form.Control
					type="textarea"
					placeholder="Definition"
					name="definition"
					defaultValue={data.definition}
					onBlur={(event) => handleOnBlur(event, validateDefinition, { definition: data.definition })}
					onChange={(e) => handleChange(e)}
				/>
				{errors.definition ? <ErrorMessage text={errors.definition} /> : null}
			</Form.Group>
			{children}
		</Form>
	);
};

export default CardForm;
