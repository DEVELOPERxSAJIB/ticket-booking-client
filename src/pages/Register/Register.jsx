import "./Register.scss";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../features/user/userApiSlice";
import { setMessageEmpty } from "../../features/user/userSlice";
import MessageAlert from "../../utils/MessageAlertAntD";
import MainLoader from "../../utils/MainLoader";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loader } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterForm = (e) => {
    e.preventDefault();
    dispatch(userRegistration(input));
  };

  useEffect(() => {
    if (error) {
      MessageAlert({ type: "info", content: error });
      dispatch(setMessageEmpty());
    }

    if (message) {
      MessageAlert({ type: "success", content: message });
      dispatch(setMessageEmpty());

      navigate("/login");
    }
  }, [error, message, dispatch, navigate]);

  return (
    <>
      {loader && <MainLoader />}
      <AuthHeader />
      <div className="main-wrapperr px-3">
        <div className="content-wrapper">
          <div className="header-area">
            <p>Register to Cinetickets</p>
          </div>

          <div className="form-area">
            <form onSubmit={handleRegisterForm} action="">
              <div className="my-3">
                <label htmlFor="">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Email *</label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  value={input.phone}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Gender *</label>
                <select
                  name="gender"
                  value={input.gender}
                  onChange={handleInputChange}
                  id=""
                  className="form-control"
                >
                  <option value="undifined">-select-</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">other</option>
                </select>
              </div>
              {/* <div className="my-3" style={{ cursor : 'not-allowed' }}>
                <label htmlFor="">Select Image</label>
                <input style={{ cursor : 'not-allowed' }} type="file" className="form-control" />
              </div> */}
              <div className="my-3">
                <label htmlFor="">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <button type="submit">Register</button>
            </form>

            <span>
              Already have an account? <Link to="/login">Login Now</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
