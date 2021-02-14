import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import NavbarToggle from 'react-bootstrap/NavbarToggle';

import { Context } from '../providers/global-context.provider';

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
			<Navbar className="navbar-expand-sm navbar-toggle able-sm ng-white border-bottom box-shadow mb-3">
				<Container>
					{isLoggedIn ? (
						<NavbarBrand href="/user/decks">Decks</NavbarBrand>
					) : (
						<NavbarBrand href="/">FlashCardsApp</NavbarBrand>
					)}
					<ul className="navbar-nav flex-grow">
						{!isLoggedIn ? (
							<NavItem>
								<NavLink className="text-dark" href="/register">
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
					{/* <NavbarToggle onClick={toggleNavbar} className="mr-2" />
					<Collapse className="d-sm-inline-flex flex-sm-row-reverse" in={!collapsed}>
					</Collapse> */}
				</Container>
			</Navbar>
		</header>
	);
};

export default NavMenu;
