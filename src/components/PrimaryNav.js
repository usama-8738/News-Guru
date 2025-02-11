import React from "react";
import { NavLink } from "react-router";

const PrimaryNav = ({ updateChange }) => {
  const handleChange = (category, country, title) => {
    updateChange(category, country, title);
  };

  const countries = [
    { code: "us", name: "United States" },
    { code: "gb", name: "United Kingdom" },
    { code: "cn", name: "China" },
    { code: "ca", name: "Canada" },
    { code: "in", name: "India" },
    { code: "au", name: "Australia" },
    { code: "za", name: "South Africa" },
  ];

  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          NewsGuru
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                onClick={() => handleChange("general", "us", "General")}
              >
                Trending Today
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Countries
              </NavLink>
              <ul className="dropdown-menu">
                {countries.map((country) => (
                  <li key={country.code}>
                    <NavLink
                      className="dropdown-item"
                      to="/"
                      onClick={() =>
                        handleChange("general", country.code, country.name)
                      }
                    >
                      {country.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </NavLink>
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category}>
                    <NavLink
                      className="dropdown-item"
                      to="/"
                      onClick={() =>
                        handleChange(
                          category,
                          "us",
                          category.charAt(0).toUpperCase() + category.slice(1)
                        )
                      }
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNav;
