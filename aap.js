import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./component/Login";
import Admin from "./component/Admin";
import Dashbord from "./component/Dashbord";
import Help from "./component/Help";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const PrivateRoute = ({ element: Element, roles }) => {
    const userRole = loggedInUser?.role;

    console.log(userRole);
    if (!loggedInUser || (roles && !roles.includes(userRole))) {
      return <Navigate to="/login" />;
    }

    return Element;
  };
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const NavBar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">LAB5 </div>
        <ul className="navbar-nav">
          {loggedInUser && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/help">
                  Help
                </Link>
              </li>
            </>
          )}
          {loggedInUser && loggedInUser.role === "Admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin Page
              </Link>
            </li>
          )}
          {loggedInUser && (
            <li>
              <p class="text-danger p">
                You're logged in as {loggedInUser.role}
              </p>
            </li>
          )}
          {!loggedInUser && (
            <li>
              <p class="text-danger p  fs-5">Login to access the application</p>
            </li>
          )}
        </ul>
        {loggedInUser && <button className="btn btn-danger" onClick={handleLogout}> logout</button>}
      </nav>
    );
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        ></Route>
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        ></Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute path="/admin" element={<Admin />} roles={["Admin"]} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute element={<Dashbord />} roles={["Admin", "User"]} />
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute element={<Help />} roles={["Admin", "User"]} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
