import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Context } from '../providers/global-context.provider';

import { Link } from 'react-router-dom';
import './NavMenu.css';
import '../custom.css';

const NavMenu = () => {
	const [ collapsed, setCollapsed ] = useState(false);
	const { isLoggedIn, logout } = useContext(Context);
	const history = useHistory();

	const toggleNavbar = () => {
		setCollapsed(!collapsed);
	};

	const handleLogout = () => {
		logout();
		history.push('/');
	};

	return (
		<header>
			<Navbar className="navbar-expand-sm navbar-toggle able-sm ng-white border-bottom box-shadow mb-3" light>
				<Container>
					{isLoggedIn ? (
						<NavbarBrand tag={Link} to="/user/decks">
							Decks
						</NavbarBrand>
					) : (
						<NavbarBrand tag={Link} to="/">
							FlashCardsApp
						</NavbarBrand>
					)}
					<NavbarToggler onClick={toggleNavbar} className="mr-2" />
					<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
						<ul className="navbar-nav flex-grow">
							{!isLoggedIn ? (
								<NavItem>
									<NavLink tag={Link} className="text-dark" to="/register">
										Register
									</NavLink>
								</NavItem>
							) : (
								<NavItem className="ml-2">
									<NavLink className="custom-btn text-dark" onClick={handleLogout}>
										Logout
									</NavLink>
								</NavItem>
							)}
						</ul>
					</Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default NavMenu;
