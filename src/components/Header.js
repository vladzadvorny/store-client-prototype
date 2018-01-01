import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

export default () => (
  <Navbar fixedTop inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Logo</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavDropdown eventKey={1} title="Bots" id="section-nav-dropdown">
        <MenuItem eventKey={1.1}>Action</MenuItem>
        <MenuItem eventKey={1.2}>Another action</MenuItem>
      </NavDropdown>
      <NavDropdown
        eventKey={2}
        title="All categories"
        id="categories-nav-dropdown"
      >
        <MenuItem eventKey={2.1}>Action</MenuItem>
        <MenuItem eventKey={2.2}>Another action</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={3} title="Vlad" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Add Product</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.2}>Sign Out</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);
