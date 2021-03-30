import React, { useEffect } from 'react';
import useFormProcessor from '../hooks/useFormProcessor';
import { getEmptyInputsErrorsObject } from '../utils/errors/decks';
import { validateName, validateDescription } from '../utils/validations/decks';

import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import ErrorMessage from './ErrorMessage';

import { IDeck } from '../contracts/deck';

const initialDeck = {
	name: '',
	description: ''
};

interface Props {
	handleFetchData : (data : IDeck) => Promise<boolean>;
	successFunc: () => void;
	deck: IDeck | null;
	children: JSX.Element;
}

const DeckForm = ({ handleFetchData, successFunc, children, deck } : Props) => {
	const { data, errors, setData, handleChange, setErrors, handleSubmit, handleOnBlur } = useFormProcessor(
		initialDeck
	);

	useEffect(
		() => {
			if (deck) {
				setData(deck);
				console.log('deck', deck)
				console.log('initialDeck', initialDeck)

			}
		},
		[ deck, setData ]
	);

	const handleFetchAsync = async () => {
		const success = await handleFetchData(data);

		if (success) {
			setErrors({ name: '', description: '' });
			successFunc();
		}
	};
	return (
		<Form onSubmit={(e) => handleSubmit(e, getEmptyInputsErrorsObject({ ...data }), handleFetchAsync)}>
			<FormGroup>
				<Form.Control
					type="text"
					placeholder="Name"
					name="name"
					value={data.name}
					onBlur={(event: React.FocusEvent<HTMLInputElement> ) => handleOnBlur(event, validateName, { name: data.name })}
					onChange={handleChange}
				/>
				{errors.name ? <ErrorMessage text={errors.name} /> : null}
			</FormGroup>
			<FormGroup>
				<Form.Control
					type="textarea"
					placeholder="Description"
					name="description"
					value={data.description}
					onBlur={(event: React.FocusEvent<HTMLInputElement> ) => handleOnBlur(event, validateDescription, { description: data.description })}
					onChange={handleChange}
				/>
				{errors.description ? <ErrorMessage text={errors.description} /> : null}
			</FormGroup>
			{children}
		</Form>
	);
};

export default DeckForm;
