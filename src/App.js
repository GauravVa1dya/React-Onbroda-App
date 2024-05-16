import "./App.css";
import React from "react";
import TabComponent from "./components/CategoriesTab/TabComponent";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./components//ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <div className="App">
      
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/home/:productId"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<TabComponent />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
