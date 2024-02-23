import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Service from "./Components/Service";
import ContectForm from "./Components/ContectForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserCredentialpage from "./Components/UserCredentialpage";
import Adminpanal from "./Components/Adminpanal";
import Errorpage from "./Components/Errorpage";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          transition={"Bounce"}
        /> */}

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contectUs" element={<ContectForm />} />
          <Route path="/Admin/Adminpanal" element={<Adminpanal />} />
          <Route path="/user" element={<UserCredentialpage />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
