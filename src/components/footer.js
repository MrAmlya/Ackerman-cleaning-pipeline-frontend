import React from "react";

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
