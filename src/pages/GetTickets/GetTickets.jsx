import "./GetTickets.scss";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import MainLoader from "../../utils/MainLoader";
import { Col, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { findUniqueTheatre } from "../../features/theatre/theatreApiSlice";
import { FaCheckCircle } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi2";
import { MdEventSeat } from "react-icons/md";
import { FaSortAmountUpAlt } from "react-icons/fa";
import StripeCheckout from "react-stripe-checkout";
import { bookSeats, makePayment } from "../../features/booking/bookingApiSlice";
import {
  bookingData,
  setMessageEmpty,
} from "../../features/booking/bookingSlice";
import MessageAlert from "../../utils/MessageAlertAntD";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { IoTabletLandscapeSharp } from "react-icons/io5";

const GetTickets = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get date from query
  let tempDate = new URLSearchParams(window.location.search).get("date");

  const [date, setDate] = useState(tempDate || moment().format("YYYY-MM-DD"));

  const { user } = useSelector((state) => state.auth);
  const { movie } = useSelector((state) => state.movies);
  const { theatre } = useSelector((state) => state.theatres);
  const { message, error, loader } = useSelector(bookingData);

  const [singleMovie, setSingleMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState();
  const [selectedSeat, setSelectedSeat] = useState([]);

  const getSeats = () => {
    const totalSeats = selectedShow?.totalSeats || 0;
    const colums = 12;

    const shows = Math.ceil(totalSeats / colums);

    return (
      <div className="gap-1 seat-wrapper">
        <div className="flex justify-between gap-3 my-2" style={{ color: "#666" }}>
          <h4 className="text-sm flex gap-1 items-center">
            <MdEventSeat />
            All Seats : {selectedShow.totalSeats}
          </h4>
          <div className="flex justify-end gap-3">
            <h4 className="text-sm flex gap-1 items-center">
              <GrStatusDisabledSmall color="#D0D3DE" size={16} />
              Booked : {selectedShow.bookedSeats.length}
            </h4>
            <h4 className="text-sm flex gap-1 items-center">
              <IoTabletLandscapeSharp color="#D0D3DE" size={16} />
              Available :{" "}
              {selectedShow.totalSeats - selectedShow.bookedSeats.length}
            </h4>
          </div>
        </div>
        {Array.from(Array(shows).keys())?.map((seat, index) => {
          return (
            <>
              <div className="gap-2 seats" key={index}>
                {Array.from(Array(colums).keys())?.map((colum, index) => {
                  let seatClass = "seat ";

                  if (selectedSeat.includes(seat * colums + colum + 1)) {
                    seatClass = seatClass + "selected-seat";
                  }

                  if (
                    selectedShow?.bookedSeats.includes(
                      seat * colums + colum + 1
                    )
                  ) {
                    seatClass = seatClass + "booked-seat";
                  }

                  return (
                    <>
                      {seat * colums + colum + 1 <= totalSeats && (
                        <div
                          className={seatClass}
                          onClick={() => {
                            const seatNumber = seat * colums + colum + 1;
                            if (selectedSeat.includes(seatNumber)) {
                              setSelectedSeat(
                                selectedSeat.filter(
                                  (item) => item !== seatNumber
                                )
                              );
                            } else {
                              setSelectedSeat([...selectedSeat, seatNumber]);
                            }
                          }}
                        >
                          <div className="text-sm" key={index}>
                            {seat * colums + colum + 1}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    );
  };

  const onToken = (token) => {
    const amount = selectedSeat?.length * selectedShow?.ticketPrice;
    dispatch(makePayment({ amount, token }));
    dispatch(
      bookSeats({
        show: selectedShow._id,
        seats: selectedSeat,
        transactionId: token.id,
        user: user._id,
      })
    );

    navigate("/profile");
  };

  const addClassName = (item) => {
    if (selectedShow === item) {
      return "a-active";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (movie) {
      setSingleMovie(movie.filter((data) => data._id === params.id)[0]);
    }
  }, [movie, params.id, dispatch]);

  useEffect(() => {
    if (params.id || date) {
      dispatch(findUniqueTheatre({ date: date, movie: params.id }));
    }
  }, [date, dispatch, params.id]);

  useEffect(() => {
    if (message) {
      MessageAlert({ type: "success", content: message });
      dispatch(setMessageEmpty());
    }
    if (error) {
      MessageAlert({ type: "error", content: error });
      dispatch(setMessageEmpty());
    }
  });

  return (
    <>
      {loader && <MainLoader />}
      <Header />
      <Navbar />
      <div className="get-tickets-wrapper">
        <div className="container py-3">
          <div className="row">
            <div className="col-md-8">
              <div className="select-date">
                <h4>Select Date</h4>
                <Form>
                  <Row>
                    <Col span={24}>
                      <Form.Item>
                        <input
                          className="date-picker"
                          type="date"
                          min={moment().format("YYYY-MM-DD")}
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value),
                              navigate(
                                `/get-tickets/${params?.id}?date=${e.target.value}`
                              );
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>

              <div className="select-movie">
                <h4>Select Movie (1)</h4>
              </div>

              {singleMovie ? (
                <>
                  <div className="movie-area">
                    <div className="movie-img">
                      <img src={singleMovie?.poster} alt="" />
                    </div>
                    <span>{singleMovie?.title}</span>
                  </div>
                </>
              ) : (
                ""
              )}

              {theatre?.length !== 0 ? (
                <div className="theatre-wrapper mt-30">
                  {theatre?.map((item, index) => (
                    <div key={index} className="theatre-area">
                      <div className="title">
                        <h1>{item.name}</h1>
                      </div>

                      <div className="show-time">
                        {item.show?.map((item, index) => (
                          <a
                            className={addClassName(item)}
                            style={{ cursor: "pointer" }}
                            key={index}
                            onClick={() => {
                              setSelectedShow(item);
                            }}
                          >
                            {moment(item.time, "hh:mm").format("hh:mm A")}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="movie-not-selected mt-3">
                  <div className="image-area">
                    <img
                      src="https://ticket.cineplexbd.com/83b26c3a1e50664459ba613c2969d538.png"
                      alt=""
                    />
                  </div>
                  <div className="text-area">
                    <h3>No Theatre Playing this movie</h3>
                    <span>
                      Here is no schedule date available for this location.
                      Please try another Date
                    </span>
                  </div>
                </div>
              )}

              {selectedShow && (
                <div className="ticket-wrapper mt-5">
                  <div className="ticket-price">
                    <FaCheckCircle size={24} style={{ color: "#5F1A89" }} />
                    <div className="info">
                      <span>TICKET PRICE</span>
                      <p>BDT {selectedShow?.ticketPrice} Tk</p>
                    </div>
                  </div>
                  {/* <div className="ticket-quantity">
                    <b>Quantitiy</b>
                  </div> */}
                </div>
              )}

              {selectedShow && (
                <div className="seat-area">
                  <div className="flex justify-between">
                    <h1>Select Seat</h1>
                  </div>
                  <div className="seat-function shadow-sm rounded">
                    {getSeats()}
                  </div>
                </div>
              )}
            </div>

            <div className="tickets-summery-wrapper col-md-4">
              <h5 className="tick-sum">Tickets Summery</h5>

              <div className="ticket-summery rounded shadow-sm mt-3">
                <div className="top-img-details">
                  <div className="img-area">
                    {selectedShow ? (
                      <img className="poster-image" src={singleMovie.poster} />
                    ) : (
                      <img
                        src={
                          "https://ticket.cineplexbd.com/43b8b54840dbff4f1aacbfcb564fd29f.png"
                        }
                      />
                    )}
                  </div>
                  <div className="movie-details">
                    {selectedShow && (
                      <>
                        <div className="cat">
                          <span>{singleMovie?.category}</span>
                        </div>
                        <div className="title">{singleMovie?.title}</div>
                        <div className="duration">
                          Duration - {singleMovie?.duration} min
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="detail-info mt-4">
                  <div className="item-info">
                    <div className="left-area">
                      <BsCalendar2Date size={20} /> <span>Show Date</span>
                    </div>
                    <div className="right-area">
                      <span>{date}</span>
                    </div>
                  </div>

                  <div className="item-info mt-3">
                    <div className="left-area">
                      <AiOutlineFundProjectionScreen size={20} />{" "}
                      <span>Hall Name</span>
                    </div>
                    <div className="right-area">
                      <span>
                        {selectedShow ? selectedShow?.theatre?.name : "--"}
                      </span>
                    </div>
                  </div>

                  <div className="item-info mt-3">
                    <div className="left-area">
                      <FaRegClock size={20} /> <span>Show Time</span>
                    </div>
                    <div className="right-area">
                      <span>{selectedShow ? selectedShow?.time : "--"}</span>
                    </div>
                  </div>

                  <div className="item-info mt-3">
                    <div className="left-area">
                      <HiOutlineTicket size={20} /> <span>Ticket Quantity</span>
                    </div>
                    <div className="right-area">
                      <span>{selectedSeat?.length}</span>
                    </div>
                  </div>

                  <div className="item-info mt-3">
                    <div className="left-area">
                      <MdEventSeat size={20} /> <span>Selected Seat</span>
                    </div>
                    <div className="right-area">
                      {selectedSeat?.map((item, index) => (
                        <>
                          {index > 0 && ", "}
                          <span key={item}>{item}</span>
                        </>
                      ))}
                    </div>
                  </div>

                  <div className="item-info mt-3">
                    <div className="left-area">
                      <FaSortAmountUpAlt size={20} /> <span>Total Amount</span>
                    </div>
                    <div className="right-area">
                      {selectedSeat.length > 0 ? (
                        <span>
                          {selectedSeat?.length * selectedShow?.ticketPrice}
                        </span>
                      ) : (
                        "--"
                      )}
                    </div>
                  </div>
                </div>

                <div className="purchase-area">
                  {selectedSeat.length <= 0 ? (
                    <button style={{ cursor: "not-allowed" }}>
                      PURCHASE TICKET
                    </button>
                  ) : (
                    <StripeCheckout
                      currency="BDT"
                      token={onToken}
                      stripeKey="pk_test_51OJK2mC0uzty5a6aCvyDcWDcXB01RJgae6EGrqNr6oMuD8DFemS56xiyQZHQHlllOhGPp70dIEvWS0RTzXwzX1KU00oDtEJ7cO"
                      amount={
                        selectedSeat?.length * selectedShow?.ticketPrice * 100
                      }
                    >
                      <button className="main-btn">PURCHASE TICKET</button>
                    </StripeCheckout>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetTickets;
