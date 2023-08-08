import React from "react";
import { Container, Nav, Navbar, NavDropdown, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../store/store";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const admin = useSelector((state) => state.auth.isAdmin);
  const token = useSelector((state) => state.auth.token.name);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(authAction.logout());
    
    // remove user from storage
    localStorage.removeItem('user')

    navigate('/')
  };

  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container> 
          <LinkContainer to="/">
            <Navbar.Brand>
              <strong>ShopIt</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="justify-content-end" >
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={e => props.submitHandler(e.target.value)}
              />
            </Form>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>Cart
                  </Nav.Link>
                </LinkContainer>

                {isLoggedIn ? (
                  <NavDropdown title={token} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    {admin && (
                      <>
                        <LinkContainer to="/productedit">
                          <NavDropdown.Item>Create Product</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/productlist">
                          <NavDropdown.Item>List Product</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orderlist">
                          <NavDropdown.Item>Order List</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Nav>
          
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;