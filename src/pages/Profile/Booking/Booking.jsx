import { useEffect, useState } from "react";
import MessageAlert from "../../../utils/MessageAlertAntD";
import {
  bookingData,
  setMessageEmpty,
} from "../../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../../../utils/MainLoader";
import axios from "axios";
import { Card, Col, Row } from "antd";
import moment from "moment";
import "./Booking.scss";

const Booking = () => {
  const dispatch = useDispatch();
  const { message, error, loader } = useSelector(bookingData);

  const [bookings, setBookings] = useState([]);
  console.log(bookings.payload);

  const fetchBookedData = async () => {
    const res = await axios.get(
      `http://localhost:3030/api/v1/booking/user-booked-shows`,
      {
        withCredentials: true,
      }
    );

    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookedData();
  }, []);

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
      <Row gutter={16}>
        {bookings.payload?.map((booking) => (
          <>
            <Col span={12}>
              <Card className="p-2 uppercase my-2">
                <div className="booked-ticket-card">
                  <div className="left-area">
                    <h3 className="text-xl">
                      {booking.show.movie.title} ({booking.show.movie.language})
                    </h3>
                    <div className="border border-1 border-gray-200"></div>
                    <h3 className="text-sm mt-2" style={{ margin: 0 }}>
                      {booking.show.theatre.name} (
                      {booking.show.theatre.address})
                    </h3>
                    <h3 className="text-sm mb-2" style={{ margin: 0 }}>
                      Purchased by : {booking.user.name}{" "}
                      <div className="lowercase inline">
                        ({booking.user.email || booking.user.phone})
                      </div>{" "}
                      
                    </h3>
                    <p style={{ margin: 0 }}>
                      Date & Time :{" "}
                      {moment(booking.show.date).format("Do MMM YYYY")} - (
                      {moment(booking.show.time, "HH:mm").format("HH : mm A")})
                    </p>
                    <p className="text-sm" style={{ margin: 0 }}>
                      Ticket Quantity : {booking.seats?.length}
                    </p>
                    <p className="text-sm" style={{ margin: 0 }}>
                      Total Amount : BDT{" "}
                      {booking.seats?.length * booking.show.ticketPrice} TK
                    </p>
                    <p className="text-sm" style={{ margin: 0 }}>
                      BookingID : {booking._id}
                    </p>
                  </div>

                  <div className="right-area text-center">
                    <img
                      src={booking.show.movie.poster}
                      height={"fill"}
                      width={120}
                      style={{objectFit : "cover"}}
                      alt=""
                      className="rounded"
                    />
                    <h3 className="text-sm mt-1">
                      Seats : {booking.seats.join(", ")}
                    </h3>
                  </div>
                </div>
              </Card>
            </Col>
          </>
        ))}
      </Row>
    </>
  );
};

export default Booking;
