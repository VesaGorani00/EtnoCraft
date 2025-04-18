import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from "react-icons/fa"
import {LinkContainer} from "react-router-bootstrap"
import logo from "../assets/logo.png"
import {useSelector, useDispatch} from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import SearchBox from './SearchBox'

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    // console.log(cartItems)//kqyre qetu te video kur e teston (video 5 min 2:40) spo na qet qat array dicka mapi spo lexohet
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logouthandler = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        }catch(err){
            console.log(err);
        }
    };  

  return (
    <header>
        <Navbar className='header-bg'  variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">

                <Navbar.Brand>
                    <img className='logo-etno' src={logo} alt="EtnoCraft" srcset="" />
                  
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <SearchBox/>
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart/>Cart
                            {
                                cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                        {cartItems.reduce((a, c) => a + c.qty, 0 )}
                                    </Badge>
                                )
                            }
                            </Nav.Link>
                        </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title = {userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                        <NavDropdown.Item onClick={logouthandler}>
                                            Logout
                                        </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                <Nav.Link href = '/login'><FaUser/> Sign in </Nav.Link>
                            </LinkContainer>
                            ) }
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id='adminmenu'>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                            {userInfo && userInfo.isMerchant && (
                                <NavDropdown title="Merchant" id='merchantmenu'>
                                    <LinkContainer to="/merchant/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/merchant/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header