import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBlog } from 'react-icons/fa'
import { SlLogin, SlLogout } from 'react-icons/sl'
import { HiHome } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { CustomContext } from '../context/AuthContext';
import ConfirmModal from '../utilities/ConfirmModal';

export default function Header() {

    const navigate = useNavigate();

    const context = CustomContext();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const user = (context?.user !== undefined) ? (context.user?.username) : "welcome";

    return (
        <div>
            <Navbar dark color='dark' expand='md' className='px-2'>
                <div className="logo d-flex align-items-center gap-1">
                    <FaBlog className='text-success' size={'1.4rem'} />
                    <NavbarBrand href='/' className='fs-5 text-success'>WEBLOG</NavbarBrand>
                </div>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className={"me-auto text-light"} navbar>
                        <Link to={"/"}>
                            <NavItem className='d-flex align-items-center p-2'>
                                <HiHome size={'1.2rem'} />
                                <span>Home</span>
                            </NavItem>
                        </Link>
                        <NavItem className='p-2'>
                            <Link to={"/new-feed"}>New Feed</Link>
                        </NavItem>
                        <NavItem className='p-2'>
                            <Link to={"/about"}>About</Link>
                        </NavItem>
                    </Nav>
                    {
                        (user && context.isAuthenticated) &&
                        <Nav>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav className='flex-center'
                                    style={{ padding: '0.5rem 0.5rem' }}
                                >
                                    <span className='me-1 text-capitalize'>{user}</span>
                                    <CgProfile size={'1.5rem'} />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => navigate("/user/dashboard")}>
                                        DashBoard
                                    </DropdownItem>
                                    <DropdownItem>Profile</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Settings</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    }
                    <Nav className='text-light'>
                        {
                            context.isAuthenticated ? (
                                <NavItem className='logout'>
                                    <ConfirmModal name={"Logout"} icon={<SlLogout />} title={"Logout"}
                                        body={"Are you sure want to logout ?"}
                                        action={context.doLogout}
                                    />
                                </NavItem>
                            ) : (
                                <Link to={"/login"}>
                                    <NavItem className='p-2 flex-center gap-1'>
                                        <span>Login</span>
                                        <SlLogin />
                                    </NavItem>
                                </Link>
                            )
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}