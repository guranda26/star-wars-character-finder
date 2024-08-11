import React from "react";
import "../styles/NotFound.css";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
