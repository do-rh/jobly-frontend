import { Redirect} from "react-router-dom";
import { useContext } from "react";

import UserContext from "./UserContext";

/** Renders Routes and Nav Components. 
*
* Props:
* - loggedOutUser - fn
*
* State:
* - None
*
* Context: consumes UserContext
*
* Routes -> Logout
*/
function Logout({ logoutUser }) {
    const currUser = useContext(UserContext);
    if(!currUser) return <Redirect to="/"/>
    logoutUser();

    return <Redirect to="/" />;
}

export default Logout;