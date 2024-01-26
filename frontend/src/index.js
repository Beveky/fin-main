import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateTask from "./Pages/UpdateTask";
import RegisterPage from "./Pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import Header from "./Components/Header";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoutes from "./Components/PrivateRoutes";
import Welcome from "./Pages/Welcome";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todo/:id" element={<UpdateTask />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<Welcome />} />
        {/* PrivateRoutes */}
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
