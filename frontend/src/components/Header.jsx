//===================================================================================================================================================================//
//                                                                         Header Component                                                                          //
//===================================================================================================================================================================//

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import SearchBar from './SearchBar';
import { logout } from '../actions/userActions.js';

//===================================================================================================================================================================//

const Header = () => {

    const dispatch = useDispatch();

    const [cartNum, setCartNum] = useState(0);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        setCartNum(cartItems.length);
    }, [cartItems]);

    const logoutHandler = () => {
        dispatch(logout());
    };

    //===============================================================================================================//

    return (
        <header>
            <Navbar variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="nav-brand">Shop<span className="ns-yellow">/</span>NS</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBar />
                        <Nav className="ms-auto">
                            { cartNum > 0 && (
                                <div className='cartNum'>{cartNum}</div>
                            ) }
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={ userInfo.name } id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={ logoutHandler }>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : <LinkContainer to="/login">
                            <Nav.Link>
                                <i className="fas fa-user"></i> Sign In
                            </Nav.Link>
                        </LinkContainer>}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id="adminmenu">
                                <LinkContainer to="/admin/userlist">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/productlist">
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orderlist">
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
};

//===================================================================================================================================================================//

export default Header;