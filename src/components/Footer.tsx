import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="created-by">
          <span>Created by</span>
          <div className="brilliant-noise">
            <span className="bn-text">Brilliant Noise</span>
            <img
              src="/brilliant_noise_logo.jpeg"
              alt="Brilliant Noise"
              className="bn-logo"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
