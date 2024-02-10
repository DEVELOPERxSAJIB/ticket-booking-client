import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="left-area">
          <p className="text-end">
            Copyright© 2023 <Link to="/forget"> Show Motion Limited</Link> . All
            Rights Reserved.
          </p>
        </div>
        <div className="right-area">
          <p className="text-end">
            Design & Developed by <Link to="/forget">SSL Wireless</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
