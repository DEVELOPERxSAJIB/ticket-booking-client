import { useState } from "react";
import "./MobileMenu.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../../features/user/userApiSlice";
import { HiOutlineBars3 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

const MobileMenu = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(userLogOut());
  };

  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="menu-mob">
        {open ? (
          <button onClick={() => setOpen((prev) => !prev)}>
            <RxCross1 />
          </button>
        ) : (
          <button onClick={() => setOpen((prev) => !prev)}>
            <HiOutlineBars3 />
          </button>
        )}
      </div>

      {open && (
        <div className="mobile-links">
          <ul>
            <li>
              <Link className={pathname === "/" ? "active" : ""} to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                ShowTimes
              </Link>
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
                <Link
                  className={pathname === "/dashboard" ? "active" : ""}
                  to={"/dashboard"}
                >
                  Admin
                </Link>
              </li>
            )}

            <li>
              <Link onClick={handleLogOut} to={"/"}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
