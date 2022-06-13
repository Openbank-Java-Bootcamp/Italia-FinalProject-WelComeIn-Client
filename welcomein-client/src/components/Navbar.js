import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <Link to="/">
        {/* <button>Home</button> Will be the logo 
        
        */}
      </Link>

      
      {isLoggedIn && (
        <>
          <Link to="/api/galleries">
            <button>Galeries</button>
          </Link>
          <Link to="/api/profile">
            <button>Profile</button>
            {/* <img /> Button or  profile image*/}
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

       {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;