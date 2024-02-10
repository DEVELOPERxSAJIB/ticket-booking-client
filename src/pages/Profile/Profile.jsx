import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import ProfileTab from "../../components/ProfileTab/ProfileTab";
import { theatreStateData } from "../../features/theatre/theatreSlice";
import MainLoader from "../../utils/MainLoader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loader } = useSelector(theatreStateData);
  const { user } = useSelector((state) => state.auth);
  
  const navigate = useNavigate()

  useEffect(() => {
    if(user.isAdmin){
      navigate('/dashboard');
    }
  }, [navigate, user.isAdmin])

  return (
    <>
      {loader && <MainLoader />}
      <Header />
      <Navbar />
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <ProfileTab />
        </div>
      </div>
    </>
  );
};

export default Profile;
