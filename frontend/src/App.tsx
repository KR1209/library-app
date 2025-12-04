import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Authors from "./pages/Authors";
import Borrow from "./pages/Borrowings";

function App() {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  // Hide navbar on login + signup pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app">
      {/* Navbar */}
      {!hideNavbar && (
        <nav
          style={{
            display: "flex",
            gap: "20px",
            padding: "15px 25px",
            background: "#1e1e1e",
            color: "white",
            fontSize: "18px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#4ade80" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/books"
              style={({ isActive }) => ({
                color: isActive ? "#4ade80" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Books
            </NavLink>

            <NavLink
              to="/users"
              style={({ isActive }) => ({
                color: isActive ? "#4ade80" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Users
            </NavLink>

            <NavLink
              to="/authors"
              style={({ isActive }) => ({
                color: isActive ? "#4ade80" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Authors
            </NavLink>

            <NavLink
              to="/borrow"
              style={({ isActive }) => ({
                color: isActive ? "#4ade80" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Borrowing
            </NavLink>
          </div>

          {isLoggedIn && (
            <button
              onClick={logout}
              style={{
                background: "red",
                padding: "6px 12px",
                borderRadius: "6px",
              }}
            >
              Logout
            </button>
          )}
        </nav>
      )}

      {/* Routes */}
      <div style={{ padding: hideNavbar ? "0px" : "25px" }}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/authors"
            element={
              <ProtectedRoute>
                <Authors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrow"
            element={
              <ProtectedRoute>
                <Borrow />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
