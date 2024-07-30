import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={"/"}>Go back to Home</Link>
    </div>
  );
};

export default NotFound;
