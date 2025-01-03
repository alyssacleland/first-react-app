'use client';

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth';

export default function NavBar() {
  const { user } = useAuth();
  // The NavBar component is a React functional component that displays the navigation bar at the top of the page. It uses the useAuth hook to access the user object and the signOut function from the auth.js file to sign out the user.
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          🏠 Useless Facts
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/form">
              ➕ CREATE A FACT
            </Link>
            <Link className="nav-link" href={`/response-yes/${user.uid}?value=Yes`}>
              ✅ YES
            </Link>

            {/*               
                  </Link>
            <Link className="nav-link" href={`/response-yes/${user.uid}?value=Yes`}>

            /response-yes is the URL path for the "Yes" response page, which is a dynamic route. so the user id is accessible as a parameter in the URL. 
            
            /${user.uid}?value=Yes is the URL path for the "Yes" response page, which includes the user's unique ID and the response value "Yes" as query parameters.

            with this, when you click the yes button in navbar, it displays that url in the browser and the page shows the user's unique ID.

            it still works without ?value=Yes, but it's better to include it for clarity. it clarifies that the user is responding "Yes" to the fact.

            note. also, this works because in the page.js file in the dynamic route [response-yes], we are using the params object to access the userID parameter from the URL. so all this href part does is display the user's unique ID in the browser when that link is clicked, and the page.js file in the dynamic route [response-yes] is what actually displays the user's unique ID on the page. honestly, right now we are just showing that the user id is accessible. we will probably change the page.js file later to do something more interesting.

            it is MY specific unique identifier that is being passed in the URL. it is not a general unique identifier. it is the unique identifier of the user that is currently logged in.
            */}

            <Link className="nav-link" href={`/response-no/${user.uid}?value=No`}>
              ❌ NO
            </Link>
          </Nav>

          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
