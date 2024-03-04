import "./Allmovies.scss";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import MainLoader from "../../utils/MainLoader";
import { FaRegCirclePlay } from "react-icons/fa6";
import moment from "moment";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalPopUp from "../../utils/ModalPopUp";

const Allmovies = () => {
  const { loader } = useSelector((state) => state.auth);
  const { movie } = useSelector((state) => state.movies);

  // play trailer
  const [trailerModal, setTrailerModal] = useState(null);
  const [trailer, setTrailer] = useState();

  const handlePlayButton = (id) => {
    const clikedMovie = movie.filter((data) => data._id === id);
    clikedMovie.map((item) => {
      setTrailer(item.trailer);
    });
    setTrailerModal(true);
  };

  return (
    <>
      {loader && <MainLoader />}
      <Header />
      <Navbar />

      {/* Trailer Modal */}
      
      <ModalPopUp
        open={trailerModal}
        title={null}
        width="1250px"
        footer={null}
        cancle={() => setTrailerModal(false)}
      >
        <iframe
          width="100%"
          height="530px"
          src={trailer}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          style={{ padding: "0", margin: "0" }}
        ></iframe>
      </ModalPopUp>

      <div className="all-movie-page-wrapper d-flex justify-center">
        <div className="overlay"></div>
        <div className="container py-5">
          <div className="row gap-4">
            {movie &&
              movie.map((item, index) => {
                return (
                  <div className="col-sm-5 col-md-4 col-xl-2 col-lg-3" key={index}>
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
                              <span onClick={() => handlePlayButton(item._id)}>
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
