import React from 'react';
import { NavLink } from 'react-router-dom';

// NavLink with activeClassName and exact props (both removed in React Router v6)
// v6 replaces activeClassName with className function: className={({isActive}) => ...}
// v6 replaces exact with end prop
function NavLinkBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active-link">
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" activeClassName="active-link">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users/1"
            activeClassName="active-link"
            activeStyle={{ fontWeight: 'bold' }}
          >
            My Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinkBar;
