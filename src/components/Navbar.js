import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useDocument } from "../hooks/useDocument";

// styles
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { document, error } = useDocument("userEnergyAndPoints", user?.uid);
  const [buttonText, setButtonText] = useState(
    "Welcome, " + (user ? user.displayName : "")
  );
  const buttonRef = useRef(null);
  const [tooltipEnergyVisible, setTooltipEnergyVisible] = useState(false); // Track energy tooltip visibility
  const [tooltipPointsVisible, setTooltipPointsVisible] = useState(false); // Track points tooltip visibility

  const location = useLocation(); 

  useEffect(() => {
    if (user) {
      setButtonText("Welcome, " + user.displayName);
    } else {
      setButtonText("Login");
    }

    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.getBoundingClientRect().width;
      buttonRef.current.style.width = buttonWidth + "px";
    }
  }, [user]);

  const handleMouseOver = () => {
    if (user) {
      setButtonText("Logout");
    } else {
      setButtonText("Login");
    }
  };

  const handleMouseOut = () => {
    if (user) {
      setButtonText("Welcome, " + user.displayName);
    } else {
      setButtonText("Login");
    }
  };

  const handleEnergyButtonClick = () => {
    setTooltipEnergyVisible(!tooltipEnergyVisible); // toggle energy tooltip visibility
  };

  const handlePointsButtonClick = () => {
    setTooltipPointsVisible(!tooltipPointsVisible); // toggle points tooltip visibility
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/" className={location.pathname === "/" ? styles.activeLink : ""}>TaskMaster</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <div className={styles.energyContainer}>
                <button
                  className={styles.energyButton}
                  onClick={handleEnergyButtonClick}
                >
                  {document ? document["energy"] : ""}
                  <img
                    src="/power.png"
                    alt="Energy Logo"
                    className={styles.energyLogo}
                  />
                </button>
                {tooltipEnergyVisible && (
                  <div className={styles.tooltip}>
                    You are given 100 points every day. Different tasks will
                    take up different amount of points.
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className={styles.energyContainer}>
                <button
                  className={styles.energyButton}
                  onClick={handlePointsButtonClick}
                >
                  {document ? document["points"] : ""}
                  <img
                    src="/shield.png"
                    alt="Energy Logo"
                    className={styles.energyLogo}
                  />
                </button>
                {tooltipPointsVisible && (
                  <div className={styles.tooltip}>
                    You will get points each time you finish a task on time :D
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link to="/friends" className={location.pathname === "/friends" ? styles.activeLink : ""}>Friends</Link>
            </li>
            <li>
              <button
                className="btn"
                onClick={logout}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                ref={buttonRef}
              >
                {buttonText}
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
