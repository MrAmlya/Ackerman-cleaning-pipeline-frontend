import React from "react";

/**
 * Renders a Navbar component with a brand logo and a collapsible navigation menu.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.authenticated - Indicates whether the user is authenticated.
 * @param {Function} props.handleLogout - Function to handle user logout when the logout button is clicked.
 * 
 * The Navbar displays a brand logo, and if the user is authenticated, it shows a logout button.
 * The navigation menu is collapsible for smaller screens.
 */
const Navbar = ({ authenticated, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-white rounded">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="./logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: "200px" }} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
          {authenticated && (
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
