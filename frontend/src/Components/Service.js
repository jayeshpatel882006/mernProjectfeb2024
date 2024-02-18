import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";

const Service = () => {
  const [services, setServices] = useState();
  const navigate = useNavigate();
  const { isLoggedIn, service } = useAuth();

  useEffect(() => {
    setServices(service);
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <>
      <div
        className="container rounded border mt-3"
        style={{ backgroundColor: "#808080" }}
      >
        <div className="d-flex justify-content-center m-4">
          <h2>Our Services </h2>
        </div>
        <div
          className="d-flex justify-content-around align-item-center flex-wrap "
          style={{ rowGap: "20px" }}
        >
          {service.map((item, index) => {
            const { services, description, price, provider } = item;
            return (
              <>
                <div key={index}>
                  <SingleService
                    key={index}
                    services={services}
                    description={description}
                    price={price}
                    provider={provider}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const SingleService = ({ services, description, price, provider }) => {
  return (
    <>
      <div className="CARD border rounded" style={{ width: "fit-content" }}>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://webfoundation.org/docs/2017/03/March-12-Letter.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Service : {services}</h5>
            <p className="card-text">Price : {price}</p>
            <p className="card-text">Description : {description}</p>
            <p className="card-text">Provider : {provider}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
