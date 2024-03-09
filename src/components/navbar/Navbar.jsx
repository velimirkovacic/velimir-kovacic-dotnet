import { Button } from "@mui/material";
import "./Navbar.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="navbar-container">
        <div className="flex-row navbar-wrapper">
          <div>
            <img src="logo/dotInstrukcije-logo.png" />
          </div>

          <div className="flex-row navbar-options">
            <h4>Pretraži</h4>
            <h4>Poruke</h4>
            <h4>Profil</h4>
            <Link to="/login">
              <Button variant="contained">Log in</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
