import "./AddTheatre.css";
import { Button, Col, Form, Input, Row, Select } from "antd";
import ModalPopUp from "../../../utils/ModalPopUp";
import TextArea from "antd/es/input/TextArea";
import { CiTrash } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheatre,
  deleteTheatre,
  getTheatreByOwner,
} from "../../../features/theatre/theatreApiSlice";
import {
  setMessageEmpty,
  theatreStateData,
} from "../../../features/theatre/theatreSlice";
import MessageAlert from "../../../utils/MessageAlertAntD";
import {
  AiOutlinePlus,
  AiOutlineArrowLeft,
  AiOutlineCheck,
  AiOutlineDelete,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { movieData } from "../../../features/movie/movieSlice";
import {
  createShow,
  deleteShow,
  getShowsByTheatre,
} from "../../../features/show/showApiSlice";
import { showsMessageNull } from "../../../features/show/showSlice";
import moment from "moment";

const AddTheatres = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { theatre, message, error } = useSelector(theatreStateData);
  const {
    show,
    message: showMessage,
    error: showError,
  } = useSelector((state) => state.shows);
  const { movie } = useSelector(movieData);

  const [modal, setModal] = useState(false);

  const handleTheatreForm = (values) => {
    values.owner = user._id;
    dispatch(createTheatre(values));
  };

  // delete theatre
  const handleDeleteTheatre = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete theatre forever",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTheatre(id));
      }
    });
  };

  const [showsModal, setShowsModal] = useState(false);
  const [view, setViewModal] = useState("");
  const [clikedTheatre, setClikedTheatre] = useState("");

  const handleAddShowsTable = (id) => {
    setClikedTheatre(theatre.filter((data) => data._id === id)[0]);
    setShowsModal(true);
    setViewModal("table");
    dispatch(
      getShowsByTheatre({
        theatreId: id,
      })
    );
  };

  // create show form submit
  const handleAddAShow = (values) => {
    values.theatre = clikedTheatre._id;
    dispatch(createShow(values));
  };

  // delete show from theatre
  const handleDeleteShowFromTheatre = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete show forever",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteShow(id));
      }
    });
  };

  useEffect(() => {
    dispatch(
      getTheatreByOwner({
        ownerId: user._id,
      })
    );
  }, [dispatch, user._id]);

  // set form value null
  useEffect(() => {
    if (message) {
      form.resetFields();
      MessageAlert({ type: "success", content: message });
      dispatch(setMessageEmpty());
    }
    if (error) {
      MessageAlert({ type: "error", content: error });
      dispatch(setMessageEmpty());
    }
  }, [message, error, setModal, form, dispatch]);

  useEffect(() => {
    if (showMessage) {
      form.resetFields();
      MessageAlert({ type: "success", content: showMessage });
      dispatch(showsMessageNull());
      setViewModal("table");
    }
    if (showError) {
      MessageAlert({ type: "error", content: showError });
      dispatch(showsMessageNull());
    }
  }, [dispatch, form, showError, showMessage]);

  return (
    <>
      <div className="admin d-flex justify-content-end">
        <Button onClick={() => setModal(true)}>Add Theatres</Button>
      </div>

      {/* theatre add modal */}
      <ModalPopUp
        title="Add a Theatre"
        width="600px"
        open={modal}
        okay={() => setModal(false)}
        cancle={() => setModal(false)}
      >
        <hr />
        <Form form={form} layout="vertical" onFinish={handleTheatreForm}>
          <Row gutter={16}>
            <Col span={"24"}>
              <Form.Item label="Hall/Theatre Name" name="name">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Address" name="address">
                <TextArea type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Phone" name="phone">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24} className="d-flex justify-content-end">
              <Button
                onClick={() => setModal(false)}
                className="ant-btn ant-btn-dashed ant-btn-dangerous me-2"
              >
                Cancle
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="ant-btn ant-btn-primary"
              >
                SAVE
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalPopUp>

      {/* Show add modal */}
      <ModalPopUp
        title=""
        width={"1400px"}
        open={showsModal}
        okay={() => setShowsModal(false)}
        cancle={() => {
          setShowsModal(false);
        }}
      >
        {view === "table" && (
          <div className="table-responsive shows-table">
            <h5>Theatre : {clikedTheatre.name} </h5>
            <hr />
            <div className="add-show d-flex justify-content-between mb-2">
              <h4 className="mt-2">Shows :</h4>
              <Button
                onClick={() => setViewModal("form")}
                size="large"
                className="ant-btn ant-btn-primary-outline"
              >
                <AiOutlinePlus />
                &nbsp;Add Shows
              </Button>
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Show Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Movie</th>
                  <th scope="col">Ticket Price</th>
                  <th scope="col">Total Seats</th>
                  <th scope="col">Available</th>
                  <th scope="col">Bookded</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {show.length === 0 && (
                  <tr className="no-data-tr">
                    <td colSpan={10}>No Data Found</td>
                  </tr>
                )}
                {show?.map((item, index) => {
                  return (
                    <tr key={index} className="show-list">
                      <td className="py-3">{item.name}</td>
                      <td className="py-3">
                        {moment(item.date).format("MMM Do YYYY")}
                      </td>
                      <td className="py-3">{item.time}</td>
                      <td className="py-3">{item?.movie?.title}</td>
                      <td className="py-3">{item.ticketPrice} tk</td>
                      <td className="py-3">{item.totalSeats}</td>
                      <td className="py-3">
                        {item.totalSeats - item.bookedSeats.length} Seats
                      </td>
                      <td className="py-3">{item.bookedSeats.length} Seats</td>
                      <td className="text-end py-3">
                        {item.bookedSeats.length <= 0 ? (
                          <Button
                            onClick={() =>
                              handleDeleteShowFromTheatre(item._id)
                            }
                            className="ant-btn btn-dangerous"
                            size="small"
                          >
                            <AiOutlineDelete />
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {view === "form" && (
          <>
            <div className="table-responsive shows-table">
              <h5>Theatre : {clikedTheatre.name} </h5>
              <hr />
              <div className="add-show d-flex justify-content-between mb-3">
                <h4 className="mt-2">Create a show</h4>
              </div>
            </div>

            <div>
              <Form form={form} layout="vertical" onFinish={handleAddAShow}>
                <Row gutter={16}>
                  <Col span={"8"}>
                    <Form.Item label="Name" name={"name"} required>
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={"8"}>
                    <Form.Item label={"Date"} required name={"date"}>
                      <Input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={"8"}>
                    <Form.Item label={"Time"} required name={"time"}>
                      <Input style={{ width: "100%" }} type="time" />
                    </Form.Item>
                  </Col>
                  <Col span={"8"}>
                    <Form.Item label={"Movie"} name="movie" required>
                      <Select placeholder="select a movie">
                        <Select.Option>-Select Movie-</Select.Option>
                        {movie.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item._id}>
                              {item.title}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Ticket Price"
                      required
                      name={"ticketPrice"}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Toatal Seats"
                      required
                      name={"totalSeats"}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={24} className="d-flex justify-content-end">
                    <Button
                      onClick={() => setViewModal("table")}
                      size="large"
                      className="ant-btn ant-btn-dangerous me-1"
                    >
                      <AiOutlineArrowLeft />
                      &nbsp;Go Back
                    </Button>
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      className="ant-btn ant-btn-primary"
                    >
                      <AiOutlineCheck />
                      &nbsp;SAVE
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </>
        )}
      </ModalPopUp>

      {!theatre ? (
        <table className="table">
          <thead className="thead-light d-flex justify-content-center">
            <td>
              <th scope="col">No Data Found</th>
            </td>
          </thead>
        </table>
      ) : (
        <table className="table table-borderd mt-3 add-theatre-form">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...theatre]?.reverse().map((item, index) => {
              return (
                <tr className="align-middle" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>

                  <td>{item.isActive ? "Active" : "Pending / Block"}</td>

                  <td>{item.email}</td>
                  <td>
                    <Button
                      className="ant-btn ant-btn-dangerous ms-1"
                      size="small"
                      onClick={() => handleDeleteTheatre(item._id)}
                    >
                      <CiTrash />
                    </Button>

                    {item.isActive && (
                      <Button
                        onClick={() => handleAddShowsTable(item._id)}
                        className="green-button ms-1"
                        size="small"
                      >
                        <AiOutlinePlus />
                        &nbsp; Show&apos;s
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AddTheatres;
