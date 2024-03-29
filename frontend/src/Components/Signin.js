import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Signin = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeToken, loading, setLoading } = useAuth();
  useEffect(() => {
    setLoading(false);
  }, []);

  const handalSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.phone === ""
    ) {
      toast.error("please fill all field", {
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
      return setLoading(false);
    } else {
      // console.log("not sended");
      const response = await fetch(
        "http://localhost:5000/auth/signup",
        // `${process.env.REACT_APP_URL}/auth//signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      // console.log("senddes");
      const json = await response.json();
      // console.log(json);
      const stringy = JSON.stringify(json);
      const Token = await JSON.parse(stringy);
      // console.log(Token?.token);
      if (Token.token) {
        // localStorage.setItem("Token", Token.token);
        // console.log(Token.token);
        storeToken(Token.token);
        navigate("/");
        toast.success(`Welcome ${user.email}`, {
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
        return setLoading(true);
      } else {
        // console.log(json);
        toast.error(json.message, {
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
        return setLoading(false);
      }
    }
    // console.log(Token?.token);
    setLoading(false);
  };
  return (
    <>
      {!loading ? (
        <>
          <div
            className="container border rounded p-3 mt-3"
            style={{
              margin: "auto",
              width: "fit-content",
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <form className="d-flex flex-column" onSubmit={handalSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  UserName
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
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
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Phone No:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary align-self-center"
              >
                Register
              </button>
            </form>
            <Link className="align-self-center" to="/auth/login">
              Have An Account
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

export default Signin;
