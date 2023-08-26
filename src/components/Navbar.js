import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}><Link to="/">TaskMaster</Link></li>

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
                <img
                  src="/flash.png"
                  alt="Energy Logo"
                  className={styles.energyLogo}
                />
                <button
                  className="btn"
                  title="You are given 100 points every day. Different tasks will take up different amount of points."
                >
                  {document ? document["energy"] : ""} pts
                </button>
              </div>
            </li>
            <li>
              <Link to="/friends">Friends</Link>
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
