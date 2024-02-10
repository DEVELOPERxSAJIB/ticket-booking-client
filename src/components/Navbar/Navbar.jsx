import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../../features/user/userApiSlice";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(userLogOut());
  };

  return (
    <div className="nav-menu">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="menu-item">
          <ul>
            <li>
              <Link className="active" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>ShowTimes</Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                Carrer
              </Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                Member
              </Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                About us
              </Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                Ticket Price
              </Link>
            </li>
            {user.isAdmin && (
              <li>
                <Link to={"/dashboard"}>Admin</Link>
              </li>
            )}

            <li>
              <Link onClick={handleLogOut} to={"/"}>
                Logout
              </Link>
            </li>
          </ul>
        </div>

        <Link to={user.isAdmin ? "/dashboard" : "/profile"}>
          <div className="user-profile">
            <Avatar
              style={{ backgroundColor: "#5F1A89", cursor: "pointer" }}
              icon={<UserOutlined />}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
