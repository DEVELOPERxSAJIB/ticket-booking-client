import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./Forget.scss";

function Forget() {
  return (
    <>
      <AuthHeader />
      <div className="main-wrapper px-4">
        <div className="content-wrapper">
          <div className="header-area">
            <p>Reset your password</p>
          </div>

          <div className="form-area">
            <form action="">
              <div className="my-3">
                <label htmlFor="">Email</label>
                <input type="text" className="form-control" />
              </div>
              <button>SEND RESET LINK</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forget;
