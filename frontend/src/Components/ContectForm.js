import React, { useEffect, useState } from "react";
import { useAuth } from "../Store/Auth";
import { useNavigate } from "react-router-dom";

const ContectForm = () => {
  const [data, setdata] = useState({
    email: "",
    username: "",
    message: "",
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState(true);
  const { user, isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, []);

  if (userData && user) {
    setdata({
      email: user.email,
      username: user.username,
      message: "",
    });
    setUserData(false);
  }

  const handalSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/contect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const isDone = await response.json();
    alert(isDone.msg);
    console.log(isDone);

    setdata({
      email: user.email,
      username: user.username,
      message: "",
    });
  };
  return (
    <>
      <div className="container p-2 rounded border mt-3">
        <form onSubmit={handalSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={data.email}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">username</label>
            <input
              type="text"
              className="form-control"
              value={data.username}
              onChange={(e) => setdata({ ...data, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Write Message
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={data.message}
              onChange={(e) => setdata({ ...data, message: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ContectForm;
