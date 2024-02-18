import React, { useEffect } from "react";
import { useAuth } from "../Store/Auth";

const About = () => {
  const { user } = useAuth();
  // console.log(user);
  return (
    <div>
      About
      {user.isAdmin ? (
        <h3>
          <b>You Are Admin</b>
        </h3>
      ) : null}
      <h3>{user.username}</h3>
      <h5>{user.email}</h5>
      <h5>{user.phone}</h5>
    </div>
  );
};

export default About;
