import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Set menuOpen to true by default
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 830); // Update isSmallScreen based on window width
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize); // Listen for window resize events

        return () => {
            window.removeEventListener("resize", handleResize); // Clean up event listener on unmount
        };
    }, []);

    return (
        <nav className={styles.navbar}>
            <a className={styles.title} href="/MarcLlopart-portfolio/">
                Home
            </a>
            <div className={styles.menu}>
                {isSmallScreen && ( // Render menu button only on small screens
                    <img
                        className={styles.menuBtn}
                        width={45}
                        height={45}
                        src={menuOpen ? getImageUrl("nav/closeIcon.png") : getImageUrl("nav/menuIcon.png")}
                        alt={menuOpen ? "close-menu-button" : "menu-button"}
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                )}
                <ul
                    className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                    onClick={() => setMenuOpen(false)}
                >
                    <li>
                        <a href="#experience">Experience</a>
                    </li>
                    <li>
                        <a href="#projects">Projects</a>
                    </li>
                    <li>
                        <a href="#tooling">Tooling Stack</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                    <li>
                        <a href="https://github.com/MarcLlopart/MarcLlopart-portfolio/raw/main/assets/cv/cv_marcllopart25.pdf" download>My CV!</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
