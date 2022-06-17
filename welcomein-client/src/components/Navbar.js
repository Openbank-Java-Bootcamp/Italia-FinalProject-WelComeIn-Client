import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav id="masthead" className="site-header">
      <div className="container">
        <div className="row justify-between">
          <div className="left-part">
            <Link to="/" className="logo">
              WelComeIn
            </Link>
          </div>
          <div className="right-part row">
            {isLoggedIn && (
              <>
                <Link to="/galleries">
                  <button>Galeries</button>
                </Link>
                <Link to="/upload">
                  <button>Upload</button>
                </Link>
                <Link to="/artists/profile">
                  <button>Profile</button>
                </Link>
                <button onClick={logOutUser}>Logout</button>
                <span>{user && user.name}</span>
                {/* <Link to="/artists/:artistId">
                <img 
                  src={`${user.picture}`} 
                  alt="{user && user.name}e's profile pic"
                  className="ProfilePic"
                  width="5%"/>
                </Link> */}
                
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link to="/signup">
                  <button>SIGN UP</button>
                </Link>
                <Link to="/login">
                  <button>LOGIN</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;