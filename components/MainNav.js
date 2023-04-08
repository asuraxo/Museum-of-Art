// import React, { useState } from 'react';
import { useState } from 'react';
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { addToHistory } from '@/lib/userData';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField ] = useState('');
    const [isExpanded, setIsExpanded ] = useState(false);

    // const [favouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const token = readToken();

    const logout = () => {
        setIsExpanded(false);
        removeToken();
        router.push('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const historyRoute = await addToHistory(`title=true&q=${searchField}`);
        setSearchHistory(historyRoute);

        router.push(`/artwork?title=true&q=${searchField}`);
        setIsExpanded(false);
    };

    const handleChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleNavbarToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleNavItemClick = () => {
        setIsExpanded(false);
    };

    return (
        <>
            <Navbar expanded={isExpanded} className="fixed-top" bg="navbar-dark bg-primary" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand>Wai Chung, So</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleNavbarToggle} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link onClick={handleNavItemClick}>Home</Nav.Link>
                            </Link>
                            {token && (
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/search"} onClick={handleNavItemClick}>Advanced Search</Nav.Link>
                                </Link>
                            )}
                        </Nav>

                        {token ? (
                            <>
                                <Form className="d-flex" onSubmit={handleSubmit}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        value={searchField}
                                        onChange={handleChange}
                                    />
                                    <Button variant="secondary" type="submit">Search</Button>
                                </Form>
                                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item onClick={handleNavItemClick}>Favourites</NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/history"} onClick={handleNavItemClick}>Search History</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link>
                                </Link>
                            </Nav>
                        )}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
};