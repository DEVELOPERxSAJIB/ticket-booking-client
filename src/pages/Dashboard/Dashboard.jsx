import "./Dashboard.css";
import DashboardTab from "../../components/DashboardTab/DashboardTab";
import Header from "../../components/Header/Header";
import { movieData } from "../../features/movie/movieSlice";
import { useSelector } from "react-redux";
import MainLoader from "../../utils/MainLoader";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const { loader } = useSelector(movieData);
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if(!user?.isAdmin) {
      navigate('/')
    }
  }, [navigate, user?.isAdmin])

  return (
    <>
      <Header />
      <Navbar />
      {loader && <MainLoader />}
      <div className="dashboard-wrapper">
        <div className="dashboard-container shadow">
          <DashboardTab />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
