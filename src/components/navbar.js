import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-white rounded">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="./logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: "200px" }} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
