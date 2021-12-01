import { NavLink } from "react-router-dom";
import React from "react";

import "./Nav.css";

/** Makes NavLinks for Navbar when user is not logged in
*
* Props:
* - None
*
* State:
* - None
*
* App -> LoggedOutNav
*/
function LoggedOutNav() {
    return (
        <nav className="Nav">
            <NavLink exact to="/">
                Jobly
            </NavLink>
            <NavLink exact to="/login">
                Login
            </NavLink>
            <NavLink exact to="/signup">
                Signup
            </NavLink>
        </nav>
    );
}

export default LoggedOutNav;