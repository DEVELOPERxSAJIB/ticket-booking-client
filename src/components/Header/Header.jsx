import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="main-header">
        <div className="container">
          <div className="logo-area">
            <Link to="/">
            <img style={{ cursor : "pointer" }}
              src="https://ticket.cineplexbd.com/0baf738c8d80f99c6b581ab315eb169a.png"
              alt=""
            />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
