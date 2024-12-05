import React from "react";

/**
 * Footer component that displays the Ackerman Center for Holocaust Studies' website link
 * and copyright information. The footer is styled with a custom color scheme.
 */
const Footer = () => {
  return (
    <footer className="text-light py-3 mt-5 text-center" style={{ color: "#154734", backgroundColor: "#154734"}}>
      <p>
        <a
          href="https://www.ackerman.utdallas.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light"
        >
          www.ackerman.utdallas.edu
        </a>
      </p>
      <p>© 2020-present Ackerman Center for Holocaust Studies. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
