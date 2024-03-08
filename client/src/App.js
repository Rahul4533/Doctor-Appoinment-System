import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Protectedroute from "./components/protectedroute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Apponiment from "./pages/Apponiment";
import Notification from "./pages/Notification";
import User from "./pages/admin/user";
import Doctors from "./pages/admin/doctor";
import Profile from "./pages/doctor/profile";
import BookingPage from "./pages/BookingPage";
import DoctorAppoinment from "./pages/doctor/DoctorAppoinment";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Protectedroute>
                <Home />
              </Protectedroute>
            }
          />
          <Route
            path="/appo"
            element={
              <Protectedroute>
                <Apponiment />
              </Protectedroute>
            }
          />
           <Route
            path="/doctor-appoinment"
            element={
              <Protectedroute>
                <DoctorAppoinment />
              </Protectedroute>
            }
          />
           <Route
            path="/doctor/profile/:id"
            element={
              <Protectedroute>
              <Profile/>
              </Protectedroute>
            }
          />
           <Route
            path="/doctor/booking/:id"
            element={
              <Protectedroute>
              <BookingPage/>
              </Protectedroute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <Protectedroute>
                <ApplyDoctor />
              </Protectedroute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Protectedroute>
                <User />
              </Protectedroute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <Protectedroute>
                <Doctors />
              </Protectedroute>
            }
          />
          <Route
            path="/notification"
            element={
              <Protectedroute>
                <Notification />
              </Protectedroute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
