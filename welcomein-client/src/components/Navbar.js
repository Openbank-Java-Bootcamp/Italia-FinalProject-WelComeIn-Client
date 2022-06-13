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
          <Link to="/api/artists/:artistId">
            <button>Profile</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
          {/* <img /> Button or  profile image*/}
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