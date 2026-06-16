import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

const getInitialTheme = () => {
    if (typeof document !== "undefined") {
        const current = document.documentElement.getAttribute("data-theme");
        if (current) return current;
    }
    try {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch {
        return "dark";
    }
};

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Set menuOpen to true by default
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [theme, setTheme] = useState(getInitialTheme);

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

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem("theme", theme);
        } catch {
            /* ignore storage errors */
        }
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

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
                    <li>
                        <button
                            type="button"
                            className={styles.themeToggle}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleTheme();
                            }}
                            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                        >
                            {theme === "light" ? (
                                <svg
                                    className={styles.themeIcon}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            ) : (
                                <svg
                                    className={styles.themeIcon}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                                </svg>
                            )}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
