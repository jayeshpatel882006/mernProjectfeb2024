import React, { useEffect, useState } from "react";
import { useAuth } from "../Store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Adminpanal = () => {
  const [allUser, setAllUser] = useState();
  const { user, setLoading, loading } = useAuth();
  const [editUser, setEditUSer] = useState();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  let currntUser = user;
  const getUserData = async () => {
    setLoading(true);
    if (!user.isAdmin) {
      toast.error("Permission Dennied");
      return navigate("/");
    }

    const response = await fetch("http://localhost:5000/admin/getAllUser", {
      method: "GET",
    });
    let data = await response.json();
    // console.log(data);

    let Done = setAllUser(data);

    return setLoading(false);
  };

  const checkIsAdmin = () => {
    if (!currntUser.isAdmin) {
      navigate("/");
      toast.error("Permission Denined", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    }
  };
  const handaldelete = async (no) => {
    let userId = allUser[no];
    const response = await fetch("http://localhost:5000/admin/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    console.log(await response.json());
    console.log(userId);
    toast.success("User Deletd", {
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
    setLoading(true);
    getUserData();
  };

  const handalEditShow = (index) => {
    setShowModal(true);
    setLoading(true);
    setEditUSer(allUser[index]);
    console.log(allUser[index]);
    setLoading(false);
  };

  const handalEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      editUser.username == "" ||
      editUser.phone == "" ||
      editUser.password == "" ||
      editUser.email == ""
    ) {
      setLoading(false);
      return toast.error("Must Fill All Items of User", {
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    } else if (editUser.phone.length <= 9) {
      setLoading(false);
      return toast.error("Phone Number must be greter than 10", {
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    } else {
      const response = await fetch("http://localhost:5000/admin/editUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });
      let output = await response.json();
      if (output.modifiedCount === 1) {
        // console.log("Done");
        setShowModal(false);
        toast.success("User Edited", {
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
      } else {
        // console.log(editUser);
        toast.info("Nothing Edited", {
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
      }
      setShowModal(false);
      // console.log(document.getElementById("editModal"));
      setLoading(false);
      getUserData();
    }
  };
  useEffect(() => {
    setLoading(true);
    getUserData();
    checkIsAdmin();
    // console.log(allUser);

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div
            className="container rounded mt-3 p-3"
            // style={{ backgroundColor: "#808080" }}
          >
            <h1 id="mainName">Hello Admin</h1>
            <div>
              <table className="table  table-hover table-bordered">
                <thead>
                  <tr>
                    <th className="wrap">Sr</th>
                    <th className="wrap">User-Name</th>
                    <th className="wrap">Password</th>
                    <th className="wrap">Email</th>
                    <th className="wrap">Phone</th>
                    <th className="wrap">POST</th>
                    <th className="wrap">Stats</th>
                    <th className="wrap">Action</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {allUser?.map((item, index) => {
                    const {
                      username,
                      phone,
                      password,
                      email,
                      isAdmin,
                      active,
                    } = item;
                    return (
                      <>
                        <tr key={index}>
                          <td className=" flex-wrap">{index + 1}</td>
                          <td className=" flex-wrap">{username}</td>
                          <td className=" flex-wrap">{password}</td>
                          <td className=" flex-wrap">{email}</td>
                          <td className=" flex-wrap">{phone}</td>
                          <td className=" flex-wrap">
                            {isAdmin ? "ADMIN" : "USER"}
                          </td>
                          <td className=" flex-wrap">
                            {active ? "Yes" : "No"}
                          </td>
                          <td className=" flex-wrap">
                            <button
                              className="btn btn-success mx-1"
                              // data-bs-target="#exampleModal"
                              // data-bs-toggle="modal"
                              onClick={() => handalEditShow(index)}
                            >
                              Edit
                            </button>
                            {user.username == username ? null : (
                              <button
                                className="btn btn-danger mx-1"
                                onClick={() => handaldelete(index)}
                              >
                                Delete
                              </button>
                            )}
                          </td>
                          {/* <div key={index}>
                            <UserDetail
                              username={username}
                              phone={phone}
                              password={password}
                              email={email}
                            />
                          </div> */}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>

              {/* <!-- EDIT Modal --> */}

              {/* <h1 className={showModal}>SHOOOs</h1> */}

              {/* <div className={`show`}> */}

              {showModal ? (
                <>
                  <div
                    className="backGround"
                    style={{
                      backgroundColor: "rgba(189,189,189,0.9)",
                      // opacity: "0.6",
                      position: "fixed",

                      top: "0px",
                      left: "0px",
                      right: "0px",
                      bottom: "0px",
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/*  */}
                    {/* </div> */}
                    {/* <div> */}
                    <div
                      className="model p-4 rounded"
                      style={{
                        // height: "50%",
                        position: "fixed",
                        backgroundColor: "white",

                        width: "40%",
                        margin: "auto",
                      }}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Edit User
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputEmail1"
                                  className="form-label"
                                >
                                  User Name
                                </label>
                                <input
                                  type="text"
                                  value={editUser?.username}
                                  onChange={(e) =>
                                    setEditUSer({
                                      ...editUser,
                                      username: e.target.value,
                                    })
                                  }
                                  className="form-control"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputEmail1"
                                  className="form-label"
                                >
                                  Email address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  value={editUser?.email}
                                  onChange={(e) =>
                                    setEditUSer({
                                      ...editUser,
                                      email: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputPassword1"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  value={editUser?.password}
                                  onChange={(e) =>
                                    setEditUSer({
                                      ...editUser,
                                      password: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputPassword1"
                                  className="form-label"
                                >
                                  Phone
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={editUser?.phone}
                                  onChange={(e) =>
                                    setEditUSer({
                                      ...editUser,
                                      phone: e.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div className="mb-3">
                                <label>Make Admin</label>
                                <input
                                  type="checkbox"
                                  className="mx-2"
                                  checked={editUser?.isAdmin}
                                  onChange={(e) =>
                                    setEditUSer({
                                      ...editUser,
                                      isAdmin: e.target.checked,
                                    })
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label>User Status : </label>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    checked={editUser.active}
                                    onChange={(e) =>
                                      setEditUSer({
                                        ...editUser,
                                        active: e.target.checked,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer gap-2">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              // data-bs-dismiss="modal"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              // data-bs-dismiss="modal"
                              onClick={(e) => handalEdit(e)}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {/* <!-- EDIT Modal Till hear --> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner statee={true} />
          </div>
        </>
      )}
    </>
  );
};

export default Adminpanal;
