import React from 'react';

import Modal from 'react-bootstrap/Modal';

interface Props {
	title: string;
	children: JSX.Element;
	show: boolean,
	toggle: () => void;
}

const ModalContainer = ({ title, children, show, toggle } : Props) => {
	return (
		<Modal
			show={show}
			animation={false}
			onHide={toggle}
			size="lg"
			aria-labelledby="contained-modal-center"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-center">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	);
};

export default ModalContainer;
