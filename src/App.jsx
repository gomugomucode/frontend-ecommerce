import Dashboard from "./components/Dashboard"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {


  return (
    <Router>
      <Routes>
       <Navbar />
      </Routes>
      
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
    </Router>
  )
}

export default App
