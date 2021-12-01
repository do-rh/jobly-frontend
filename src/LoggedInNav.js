import { NavLink } from "react-router-dom";
import React from "react";

import "./Nav.css";

/** Makes NavLinks for Navbar when user is logged in
*
* Props: username - "testuser"
* State: None
*
* App -> LoggedInNav
*/
function LoggedInNav({ username }) {
    return (
        <nav className="Nav">
            <NavLink exact to="/">
                Jobly
            </NavLink>
            <NavLink exact to="/companies">
                Companies
            </NavLink>
            <NavLink exact to="/jobs">
                Jobs
            </NavLink>
            <NavLink exact to="/profile">
                Edit Profile
            </NavLink>
            <NavLink exact to="/logout">
                Logout of {username}
            </NavLink>
        </nav>
    );
}

export default LoggedInNav;