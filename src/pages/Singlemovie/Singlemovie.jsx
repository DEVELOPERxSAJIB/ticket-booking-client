import "./Singlemovie.scss";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import MainLoader from "../../utils/MainLoader";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import ModalPopUp from "../../utils/ModalPopUp";

const Singlemovie = () => {
  const { loader } = useSelector((state) => state.auth);
  const { movie } = useSelector((state) => state.movies);

  const params = useParams();

  const [singleMovie, setSingleMovie] = useState();

  useEffect(() => {
    if (movie) {
      setSingleMovie(movie.filter((data) => data._id === params.id));
    }
  }, [movie, params.id]);

  const [modal, setModal] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const handleTrailerBtn = (trailer) => {
    setTrailer(trailer);
    setModal(true)
  };

  return (
    <>
      {loader && <MainLoader />}
      <Header />
      <Navbar />

      <ModalPopUp
        open={modal}
        cancle={() => {
          setModal(false)
          setTrailer(null)
        }}
        title={null}
        width="950px"
        footer={null}
      >
        <iframe
          width="100%"
          height="530px"
          src={trailer}
          title="YouTube video player"
          frameBorder="50px"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          style={{ padding: "0", margin: "0" }}
        ></iframe>
      </ModalPopUp>

      {singleMovie &&
        singleMovie.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="banner-area"
                style={{
                  zIndex: "-2",
                }}
              >
                <img
                  src={item.banner}
                  alt=""
                  style={{
                    backgroundPositionX: "top",
                  }}
                />
                <div className="overlay"></div>
              </div>

              <div
                className="single-movie-wrapper"
                style={{
                  marginTop: "-450px",
                  zIndex: "1",
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="single-movie-item d-flex gap-4">
                        <div className="poster">
                          <img src={item.poster} alt="" />
                        </div>
                        <div className="single-movie-info">
                          <div className="details">
                            <div className="title">{item.title}</div>

                            <div className="info-item">
                              <div className="info-fi">
                                <span>Category : {item.category}</span>
                                <p></p>
                              </div>
                            </div>

                            <div className="info-item">
                              <div className="info-fi">
                                <span>Actor : {item.actors}</span>
                              </div>
                            </div>

                            <div className="info-item">
                              <div className="info-fi">
                                <span>Ganre : {item.ganre}</span>
                                <span></span>
                              </div>
                            </div>
                            <div className="info-item">
                              <div className="info-fi">
                                <span>
                                  Release :{" "}
                                  {moment(item.releaseDate).format(
                                    "MMMM Do YYYY"
                                  )}
                                </span>
                                <span></span>
                              </div>
                            </div>

                            <div className="info-item">
                              <div className="info-fi">
                                <span>Language : {item.language}</span>
                                <span></span>
                              </div>
                            </div>

                            <Link>
                              <div
                                onClick={() => handleTrailerBtn(item.trailer)}
                                className="single-movie-btn"
                              >
                                wathch Trailer
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="description-area">
                <div className="container">
                  <div className="row">
                    <h2>Description</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default Singlemovie;
