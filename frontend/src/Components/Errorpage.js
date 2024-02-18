import React from "react";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div
      //   style={{ backgroundColor: "red" }}
      className="container border rounded mt-4 p-5 d-flex flex-column align-items-center justify-content-center"
    >
      <h2>Something Went Wrong </h2>
      <h3>Error 404 Error</h3>
      <Link to={"/"} className="btn btn-outline-danger">
        GO TO HOME
      </Link>
    </div>
  );
};

export default Errorpage;
