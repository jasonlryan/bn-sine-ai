import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

interface NavigationProps {
  experimentIds?: string[];
  currentExperimentId?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  experimentIds = [],
  currentExperimentId,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="home-link">
            <img
              src="/sine-digital-logo.png"
              alt="SINE Digital"
              className="logo"
            />
            <span className="brand-text">AI Experiments</span>
          </Link>
        </div>

        {!isHomePage && (
          <div className="nav-links">
            <Link to="/" className="nav-link">
              ← Back to Index
            </Link>

            {currentExperimentId && experimentIds.length > 1 && (
              <div className="lateral-nav">
                {experimentIds.map((id, index) => {
                  // Find the current experiment index
                  const currentIndex = experimentIds.findIndex(
                    (expId) => expId === currentExperimentId
                  );

                  // Only show previous and next links if they exist
                  if (id === currentExperimentId) {
                    return null;
                  }

                  if (index === currentIndex - 1) {
                    return (
                      <Link
                        key={id}
                        to={`/experiment/${id}`}
                        className="nav-link prev-link"
                      >
                        ← Previous
                      </Link>
                    );
                  }

                  if (index === currentIndex + 1) {
                    return (
                      <Link
                        key={id}
                        to={`/experiment/${id}`}
                        className="nav-link next-link"
                      >
                        Next →
                      </Link>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
