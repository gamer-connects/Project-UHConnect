/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const pathName = usePathname();

  // User data
  const currentUser = session?.user?.email ?? null;
  const role = session?.user?.role ?? null; // <-- FIXED: get role directly

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand-custom">
          <strong>UH Connect</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">

            {/* Home */}
            <Nav.Link id="home-nav" href="/home" active={pathName === '/home'}>
              Home
            </Nav.Link>

            {/* Games */}
            <Nav.Link id="games-nav" href="/games" active={pathName === '/games'}>
              Games
            </Nav.Link>

            {/* Logged-in user menu */}
            {currentUser && (
              <>
                <Nav.Link
                  id="profile-nav"
                  href="/profiles"
                  active={pathName === '/profiles'}
                >
                  Profile
                </Nav.Link>

                <Nav.Link
                  id="user-search-nav"
                  href="/usersearch"
                  active={pathName === '/usersearch'}
                >
                  User Search
                </Nav.Link>

                <Nav.Link
                  id="request-event-nav"
                  href="/request-event"
                  active={pathName === '/request-event'}
                >
                  Request Event
                </Nav.Link>
              </>
            )}

            {/* ADMIN ONLY */}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link
                id="admin-stuff-nav"
                href="/admin"
                active={pathName === '/admin'}
              >
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
{' '}
Sign Out
                </NavDropdown.Item>

                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
{' '}
Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
{' '}
Sign in
                </NavDropdown.Item>

                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
{' '}
Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
