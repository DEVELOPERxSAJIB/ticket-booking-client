import { useEffect, useState } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userApiSlice";
import { setMessageEmpty } from "../../features/user/userSlice";
import MessageAlert from "../../utils/MessageAlertAntD";
import MainLoader from "../../utils/MainLoader";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, message, loader } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginForm = (e) => {
    e.preventDefault();

    dispatch(loginUser(input));
  };

  useEffect(() => {
    if (error) {
      MessageAlert({ content: error });
      dispatch(setMessageEmpty());
    }
    if (message) {
      MessageAlert({ type: "success", content: message });
      dispatch(setMessageEmpty());
    }

    if (user) {
      navigate("/");
    }
  }, [error, message, dispatch, navigate, user]);

  return (
    <>
      {loader && <MainLoader />}
      <AuthHeader />

      <div className="main-wrapper px-4">
        <div className="content-wrapper">
          <div className="header-area">
            <p>Login to Cinetickets</p>
          </div>

          <div className="form-area">
            <form onSubmit={handleLoginForm} action="">
              <div className="my-3">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <p className="text-end">
                Forgot your <Link to="/forget">Password ?</Link>
              </p>
              <button>Login</button>
            </form>

            <div className="cus-border"></div>

            <div className="or">
              <strong className="border">Or</strong>
            </div>

            <span>
              Did you have an account yet?{" "}
              <Link to="/register">Register Now</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
