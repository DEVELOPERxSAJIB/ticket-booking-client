import { useDispatch, useSelector } from "react-redux";
import {
  setMessageEmpty,
  theatreStateData,
} from "../../../features/theatre/theatreSlice";
import { useEffect } from "react";
import MessageAlert from "../../../utils/MessageAlertAntD";
import { Button } from "antd";
import Swal from "sweetalert2";
import { updateTheatreStatus } from "../../../features/theatre/theatreApiSlice";

function Theatres() {
  const dispatch = useDispatch();

  const { alltheatre, message, error } = useSelector(theatreStateData);

  const handleChangeStatus = (isActive, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will update theatre status",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Sure",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateTheatreStatus({ isActive, id }));
      }
    });
  };

  useEffect(() => {
    if (message) {
      MessageAlert({ type: "success", content: message, duration: "3" });
      dispatch(setMessageEmpty());
    }
    if (error) {
      MessageAlert({ type: "error", content: error, duration: "3" });
      dispatch(setMessageEmpty());
    }
  }, [message, error, dispatch]);

  return (
    <>
      {!alltheatre ? (
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
            {[...alltheatre]?.reverse().map((item, index) => {
              return (
                <tr className="align-middle" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>

                  <td>
                    {item.isActive ? (
                      "Active"
                    ) : (
                      <div
                        className="active-pending"
                        style={{
                          border: "2px dotted #e9e9e9",
                          paddingLeft: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        Pending / Block
                      </div>
                    )}
                  </td>

                  <td>{item.email}</td>
                  <td>
                    {item.isActive ? (
                      <Button
                        onClick={() =>
                          handleChangeStatus(item.isActive, item._id)
                        }
                        className="ant-btn ant-btn-dangerous"
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        className="ant-btn"
                        onClick={() =>
                          handleChangeStatus(alltheatre.isActive, item._id)
                        }
                      >
                        Approve
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
}

export default Theatres;
