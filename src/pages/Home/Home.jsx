import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import MessageAlert from "../../utils/MessageAlertAntD";
import { setMessageEmpty } from "../../features/user/userSlice";
import MainLoader from "../../utils/MainLoader";
import Slider from "./Slider";
import {
  FaFacebookF,
  FaAngleRight,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from "moment";
import ModalPopUp from "../../utils/ModalPopUp";

function Home() {
  const dispatch = useDispatch();

  const { error, message, loader } = useSelector((state) => state.auth);
  const { movie } = useSelector((state) => state.movies);

  const [lastFive, setLastFive] = useState();

  useEffect(() => {
    if (movie) {
      const lastFiveMovies = movie.slice(-5);
      setLastFive(lastFiveMovies);
    }
  }, [movie]);

  const [trailerModal, setTrailerModal] = useState(null);
  const [trailer, setTrailer] = useState();

  const handlePlayButton = (id) => {
    const clikedMovie = movie.filter((data) => data._id === id);
    clikedMovie.map((item) => {
      setTrailer(item.trailer);
    });
    setTrailerModal(true);
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
  }, [error, message, dispatch]);

  return (
    <>
      {loader && <MainLoader />}
      <Header />
      <Navbar />
      <Slider />

      <ModalPopUp
        open={trailerModal}
        title={null}
        width="950px"
        footer={null}
        cancle={() => setTrailerModal(false)}
      >
        <iframe
          width="100%"
          height="530px"
          src={trailer}
          title="YouTube video player"
          frameborder="50px"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          style={{ padding: "0", margin: "0" }}
        ></iframe>
      </ModalPopUp>

      <div className="social-wrapper">
        <div className="social-links d-flex justify-content-center gap-5">
          <a href="https://www.facebook.com/Md.SaJib.Raajput/" target="_black">
            <div className="social-item d-flex align-items-center">
              <FaFacebookF />
              <span>Visit facebook</span>
              <FaAngleRight />
            </div>
          </a>
          <a href="https://www.linkedin.com/in/mdsajibshikder/" target="_black">
            <div className="social-item d-flex align-items-center">
              <FaLinkedinIn className="mr-1" />
              <span>Visit Linkedin</span>
              <FaAngleRight />
            </div>
          </a>
          <a
            href="https://www.instagram.com/sajib_shikder_meharav/"
            target="_black"
          >
            <div className="social-item d-flex align-items-center">
              <FaInstagram className="mr-1" />
              <span>instagram</span>
              <FaAngleRight />
            </div>
          </a>
        </div>
      </div>

      {/* Movie content */}
      <div className="all-movie-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content d-flex justify-content-between">
                <div className="menu-movie">
                  <ul>
                    <li>
                      <a className="active" href="">
                        Now Showing
                      </a>
                    </li>
                    <li>
                      <a href="">Show Time</a>
                    </li>
                  </ul>
                </div>
                <Link to="/all-movies">
                  <div className="movie-button d-flex align-items-center">
                    <span>View All Movie</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="row pt-5">
            <div className="col-md-12">
              <div className="movie-category-wrapper">
                {movie &&
                  lastFive?.map((item, index) => {
                    return (
                      <div className="movie-item" key={index}>
                        <div className="main-item">
                          <img src={item.poster} alt="" />
                          <Link to={`/get-tickets/${item._id}?date=${moment().format("YYYY-MM-DD")}`}>
                            <div className="get-tickets">
                              <span>Get Tickets</span>
                            </div>
                          </Link>
                        </div>

                        <div className="main-item-content">
                          <div className="content">
                            <div className="playbutton">
                              <span onClick={() => handlePlayButton(item._id)}>
                                <FaRegCirclePlay />
                              </span>
                            </div>
                            <div className="info">
                              <strong>{item.title}</strong>
                              <span>
                                RELEASE :{" "}
                                {moment(item.releaseDate).format("MMM Do YYYY")}
                              </span>
                              <span>GANRE : {item.ganre}</span>
                            </div>
                            <Link to={`/all-movies/${item._id}`}>
                              <div className="details">
                                <span>Details</span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
