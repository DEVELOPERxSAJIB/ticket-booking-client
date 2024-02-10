import "./Header.scss";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

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
          <div className="search-area">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search Here"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button type="submit" id="button-addon2">
                <BiSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
