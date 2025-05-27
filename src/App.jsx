import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50"> 
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
