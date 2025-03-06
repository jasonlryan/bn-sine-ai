import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExperimentPage from "./pages/ExperimentPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/experiment/:id"
            element={
              <>
                <ExperimentPage />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
