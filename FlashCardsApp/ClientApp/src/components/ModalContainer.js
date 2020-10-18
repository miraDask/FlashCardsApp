import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Context } from '../providers/global-context.provider';

const ModalContainer = ({ title, className, handleSubmit, children, show }) => {
	const { toggleModal } = useContext(Context);

	const closeBtn = (
		<button className="close" onClick={toggleModal}>
			&times;
		</button>
	);
	return (
		<Modal isOpen={show} toggle={toggleModal} className={className}>
			<ModalHeader toggle={toggleModal} close={closeBtn}>
				{title}
			</ModalHeader>
			<ModalBody>{children}</ModalBody>
			<ModalFooter>
				<Button color="success" onClick={handleSubmit}>
					Submit
				</Button>{' '}
				<Button color="secondary" onClick={toggleModal}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ModalContainer;
