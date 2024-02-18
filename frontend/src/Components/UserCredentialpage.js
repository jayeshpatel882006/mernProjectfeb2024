import React, { useState } from "react";
import { useAuth } from "../Store/Auth";
import { Link } from "react-router-dom";

const UserCredentialpage = () => {
  const [showtxt, setshowtxt] = useState(false);
  const { user } = useAuth();
  const handalEdit = () => {
    setshowtxt(!showtxt);
  };
  return (
    <>
      <div className="container border rounded mt-2 p-3">
        <div>
          <h1>
            Hello , {user.username}
            {user.isAdmin ? <b> You are Admin</b> : null}
          </h1>
          <h3>Phone No : {user.phone}</h3>
          <h3>Email : {user.email}</h3>
          <button className="btn btn-info" onClick={() => handalEdit()}>
            Want To Edit
          </button>
          {showtxt ? (
            <>
              <div
                className="rounded my-3 p-3"
                style={{ backgroundColor: "#808080", color: "white" }}
              >
                <h3>
                  You can't edit by your self you can contect us{" "}
                  <Link to={"/contectUs"} className="btn btn-secondary">
                    Contect Page
                  </Link>{" "}
                </h3>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UserCredentialpage;
