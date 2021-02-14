import React from 'react';

import Modal from 'react-bootstrap/Modal';

const ModalContainer = ({ title, children, show, toggle }) => {
	return (
		<Modal
			show={show}
			animation={false}
			onHide={toggle}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	);
};

export default ModalContainer;
