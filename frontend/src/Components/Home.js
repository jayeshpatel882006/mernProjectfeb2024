import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";
import About from "./About";
import Spinner from "./Spinner";

const Home = () => {
  // const [user, setUser] = useState();
  const navigate = useNavigate();
  const {
    logOutHandal,
    user,
    token,
    userAuthentication,
    isLoggedIn,
    setLoading,
    loading,
  } = useAuth();
  const getdata = async () => {
    // console.log("token :", token);
    // console.log("user :", user.email);
    // const data = await localStorage.getItem("Token");
    if (!isLoggedIn) {
      navigate("/auth/login");
    } else {
      userAuthentication();
    }
    // setUser(data);
    // }
    // console.log(data);
  };
  useEffect(() => {
    getdata();
  }, []);

  const handalLogout = () => {
    logOutHandal();
    navigate("/auth/login");
  };

  return (
    <>
      {user ? (
        <>
          <div
            className="container border rounded p-2 mt-4"
            style={{ width: "90%", overflowWrap: "anywhere" }}
          >
            Home
            <h2>
              Hello {user?.username} and Token is : {token}
            </h2>
            <div>
              <button className="btn btn-danger" onClick={handalLogout}>
                Log out
              </button>
            </div>
            <About />
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
            <Spinner statee={loading} />
            {/* {spin()} */}
            {/* <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            /> */}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
