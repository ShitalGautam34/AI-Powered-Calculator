import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import { useEffect } from "react";

const Header = () => {
  const navLinks = [
    { id: 0, title: "Calculator", path: "/" },
    { id: 1, title: "Documentation", path: "/docs" },
  ];

  const [activeId, setActiveId] = useState(0);

  window.onscroll = () => {
    if (window.scrollY > 70) {
      document.querySelector("header").classList.add("scroll");
    } else {
      document.querySelector("header").classList.remove("scroll");
    }
  };

  return (
    <header>
      <h1 className="logo">AI Calculator</h1>
      <ul>
        {navLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.id}
            className={`${link.id === activeId ? "active" : ""}`}
            onClick={() => setActiveId(link.id)}
          >
            {link.title}
          </NavLink>
        ))}
      </ul>
    </header>
  );
};

export default Header;
