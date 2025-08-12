import Dashboard from "./components/Dashboard"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import the provider
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <CartProvider>
        <Router>
          <Navbar />
          <main>
            <Routes>
              {/* All your routes should be inside this component */}
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
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;



