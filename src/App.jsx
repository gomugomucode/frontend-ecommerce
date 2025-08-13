// Corrected file: src/App.js
// This file is updated to include the ModalProvider and Modal component,
// and the old /login and /signup routes have been removed.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1. Import your providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ModalProvider } from "./context/ModalContext"; // NEW

// 2. Import your components and pages
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Modal from './components/Modal'; // NEW
// ... any other pages you have

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ModalProvider> {/* NEW: The ModalProvider wraps everything */}
          <Router>
            <Navbar />
            <Modal /> {/* NEW: The Modal component is placed here to be globally available */}
            
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {/* The /login and /signup routes are no longer needed */}
                
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                {/* Add other routes as needed (e.g., for products, about page, etc.) */}
              </Routes>
            </main>
          </Router>
        </ModalProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

