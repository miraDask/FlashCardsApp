import React from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, NavLink } from 'reactstrap';

const CreateDropdown = () => {
	return (
		<UncontrolledButtonDropdown>
			<DropdownToggle className="btn btn-light" caret>
				Create
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem>
					<NavLink tag={Link} className="text-dark" to="/">
						Card
					</NavLink>
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
					<NavLink tag={Link} className="text-dark" to="/">
						Deck
					</NavLink>
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledButtonDropdown>
	);
};

export default CreateDropdown;
