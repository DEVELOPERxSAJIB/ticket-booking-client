import "./Allmovies.scss";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import MainLoader from "../../utils/MainLoader";
import { FaRegCirclePlay } from "react-icons/fa6";
import moment from "moment";
import { Link } from "react-router-dom";

const Allmovies = () => {
  const { loader } = useSelector((state) => state.auth);
  const { movie } = useSelector((state) => state.movies);
  return (
    <>
      {loader && <MainLoader />}
      <Header />
      <Navbar />

      <div className="all-movie-page-wrapper">
        <div className="overlay"></div>
        <div className="container py-5">
          <div className="row gap-4">
            {movie &&
              movie.map((item, index) => {
                return (
                  <div className="col-md-2" key={index}>
                    <div className="movie-category-wrapper">
                      <div className="movie-item">
                        <div className="main-item">
                          <img src={item.poster} alt="" />
                          <Link
                            to={`/get-tickets/${item._id}?date=${moment().format(
                              "YYYY-MM-DD"
                            )}`}
                          >
                            <div className="get-tickets">
                              <span>Get Tickets</span>
                            </div>
                          </Link>
                        </div>

                        <div className="main-item-content">
                          <div className="content">
                            <div className="playbutton">
                              <span>
                                <FaRegCirclePlay />
                              </span>
                            </div>
                            <div className="info">
                              <strong>{item.title}</strong>
                              <span>
                                RELEASE :{" "}
                                {moment(item.releaseDate).format("MMM Do YYYY")}{" "}
                              </span>
                              <span>GANRE : {item.ganre}</span>
                            </div>
                            <Link to={item._id}>
                              <div className="details">
                                <span>Details</span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Allmovies;
