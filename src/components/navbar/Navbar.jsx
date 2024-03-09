import { Button } from "@mui/material";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { logout } from "../../api/AuthApi";

function HomePage() {

  const token = localStorage.getItem('token');
  let loggedIn = Boolean(token);

  return (
    <>
      <div className="navbar-container">
        <div className="flex-row navbar-wrapper">
          <div>
            <img src="logo/dotInstrukcije-logo.png" />
          </div>

          <div className="flex-row navbar-options">
            <Link to="/protected">
              <Button variant="contained">Protected</Button>
            </Link>
            {loggedIn ? (
              <>
              <h4>Pretraži</h4>
              <h4>Poruke</h4>
              <Link to="/profile">
                <Button variant="contained">Profil</Button>
              </Link>
              <h4>Moji predmeti</h4>
              <Button variant="contained" onClick={logout}>Odjavi se</Button></>
            ) : (
              <Link to="/login">
                <Button variant="contained">Log in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
