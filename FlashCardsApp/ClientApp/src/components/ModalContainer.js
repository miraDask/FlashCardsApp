import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Context } from '../providers/global-context.provider';

const ModalContainer = ({ title, className, children, show }) => {
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
		</Modal>
	);
};

export default ModalContainer;
