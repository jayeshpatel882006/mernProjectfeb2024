import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [user, setUser] = useState("");
  const [service, setSrvcice] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);

  const getToken = () => {
    if (!token) {
      return false;
    } else {
      return true;
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/service", {
        method: "GET",
        headers: {
          Authorize: token,
        },
      });
      const output = await response.json();
      // console.log(output);
      setSrvcice(output);
      // console.log(await response.json());
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const isLoggedIn = !!token;

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/user", {
        method: "GET",
        headers: {
          Authorize: token,
        },
      });
      const data = await response.json();
      // console.log(data);
      // if (response.ok) {
      return setUser(data);

      // console.log("Done From Frontend");
      // console.log(data);
      // }
    } catch (error) {
      console.log("Frontend Auth.js Error", error);
    }
  };

  // userAuthentication();
  const storeToken = (token) => {
    setToken(token);
    return localStorage.setItem("Token", token);
  };
  const logOutHandal = () => {
    localStorage.removeItem("Token");
    setToken("");
    setUser("");
  };

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        logOutHandal,
        isLoggedIn,
        user,
        token,
        service,
        userAuthentication,
        loading,
        setLoading,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
