import React, { useState } from "react";
import { Link } from "react-router-dom";  // ✅ use Link instead of <a>
import styles from "./navbar.module.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { id: 1, label: "Home", path: "/" },
        { id: 2, label: "About", path: "/about" },
        { id: 3, label: "Services", path: "/services" },
        { id: 4, label: "Portfolio", path: "/fortofolio" },
        { id: 5, label: "Contact", path: "/contact" },
        { id: 6, label: "cart", path: "/shop" },
    ];

    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
                Nrwn's
            </Link>

            {/* Mobile Menu Button */}
            <button
                className={styles.menuButton}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Navigation Links */}
            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={item.path}
                            className={styles.navLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default Navbar;
