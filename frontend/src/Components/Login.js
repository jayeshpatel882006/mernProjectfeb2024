import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [btn, setbtn] = useState(false);
  const navigate = useNavigate();
  const { storeToken, setLoading, loading } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handalSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      setLoading(false);
      toast.error("plese enter some value", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_URL}5000/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      console.log("json");
      // console.log(response);
      const json = await response.json();
      console.log(json);
      if (json.token) {
        setLoading(true);
        storeToken(json.token);
        navigate("/");
        toast.success(`Welcome ${user.email}`, {
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
      } else {
        toast.error(json, {
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
        setLoading(false);
      }
    }

    // console.log(json);

    setLoading(false);
  };
  return (
    <>
      {!loading ? (
        <>
          <div className="container border rounded p-2 mt-3">
            <form onSubmit={handalSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type={btn ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  style={{ height: "35px" }}
                  className="btn btn-outline-primary m-1"
                  onClick={() => setbtn(!btn)}
                >
                  {btn ? (
                    <>
                      <div className=" d-flex  align-items-baseline">
                        <p className="mx-1">hide password</p>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/6423/6423885.png"
                          width={"15px"}
                          height={"15px"}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className=" d-flex  align-items-baseline">
                        <p className="mx-1">show password</p>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/8395/8395688.png"
                          width={"15px"}
                          height={"15px"}
                        />
                      </div>
                    </>
                  )}
                </button>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <Link to="/auth/signin" className="">
              Don't have any Account , Sign Up
            </Link>
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

export default Login;
