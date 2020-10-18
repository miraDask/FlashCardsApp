import React, { useContext } from 'react';
import useFormProcessor from '../hooks/useFormProcessor';
import { Context } from '../providers/global-context.provider';
import { getEmptyInputsErrorsObject } from '../utils/errors/decks';
import { validateName, validateDescription } from '../utils/validations/decks';

import { Form, FormGroup, Input } from 'reactstrap';
import ErrorMessage from './ErrorMessage';

const initialDeck = {
	name: '',
	description: ''
};

const DeckForm = ({ handleFetchData, children }) => {
	const { data, errors, handleChange, setErrors, handleSubmit, handleOnBlur } = useFormProcessor(
		initialDeck,
		initialDeck
	);
	const { toggleModal } = useContext(Context);

	const handleFetchAsync = async () => {
		const success = await handleFetchData(data);

		if (success) {
			setErrors({ name: '', key: '' });
			toggleModal();
		}
	};
	return (
		<Form onSubmit={(e) => handleSubmit(e, getEmptyInputsErrorsObject({ ...data }), handleFetchAsync)}>
			<FormGroup>
				<Input
					type="text"
					placeholder="Name"
					name="name"
					value={data.name}
					onBlur={(event) => handleOnBlur(event, validateName, { name: data.name })}
					onChange={handleChange}
				/>
				{errors.name ? <ErrorMessage text={errors.name} /> : null}
			</FormGroup>
			<FormGroup>
				<Input
					type="textarea"
					placeholder="Description"
					name="description"
					value={data.description}
					onBlur={(event) => handleOnBlur(event, validateDescription, { description: data.description })}
					onChange={handleChange}
				/>
				{errors.description ? <ErrorMessage text={errors.description} /> : null}
			</FormGroup>
			{children}
		</Form>
	);
};

export default DeckForm;
