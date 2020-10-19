import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalContainer = ({ title, className, children, show, toggle }) => {
	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);

	return (
		<Modal isOpen={show} toggle={toggle} className={className}>
			<ModalHeader toggle={toggle} close={closeBtn}>
				{title}
			</ModalHeader>
			<ModalBody>{children}</ModalBody>
		</Modal>
	);
};

export default ModalContainer;
