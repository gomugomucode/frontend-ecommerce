import Dashboard from "./components/Dashboard"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from"./components/ProtectedRoute"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes> {/* All your routes should be inside this component */}
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
      
    </Router>
  )
}

export default App