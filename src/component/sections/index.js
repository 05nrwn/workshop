import React from 'react';
import Hero from './hero';
import About from './about';
import Experience from './exp';
import Education from './edu';
import Skills from './skill';
import Projects from './project';
import Contact from './contact';
import styles from './index.module.css';

const CVPortfolio = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className={styles.portfolioContainer}>
            {/* Navigation Menu */}
            <nav className={styles.navigation}>
                <div className={styles.navContainer}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>Ferdy Nuriawan</span>
                        <span className={styles.logoSubtext}>Portfolio</span>
                    </div>
                    <ul className={`${styles.navMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
                        <li><a href="#hero" className={styles.navLink} onClick={closeMobileMenu}>Home</a></li>
                        <li><a href="#about" className={styles.navLink} onClick={closeMobileMenu}>About</a></li>
                        <li><a href="#experience" className={styles.navLink} onClick={closeMobileMenu}>Experience</a></li>
                        <li><a href="#education" className={styles.navLink} onClick={closeMobileMenu}>Education</a></li>
                        <li><a href="#skills" className={styles.navLink} onClick={closeMobileMenu}>Skills</a></li>
                        <li><a href="#projects" className={styles.navLink} onClick={closeMobileMenu}>Projects</a></li>
                        <li><a href="#contact" className={styles.navLink} onClick={closeMobileMenu}>Contact</a></li>
                    </ul>
                    <div
                        className={`${styles.navToggle} ${isMobileMenuOpen ? styles.active : ''}`}
                        onClick={toggleMobileMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className={styles.section}>
                <Hero />
            </section>

            {/* About Section */}
            <section id="about" className={styles.section}>
                <About />
            </section>

            {/* Experience Section */}
            <section id="experience" className={styles.section}>
                <Experience />
            </section>

            {/* Education Section */}
            <section id="education" className={styles.section}>
                <Education />
            </section>

            {/* Skills Section */}
            <section id="skills" className={styles.section}>
                <Skills />
            </section>

            {/* Projects Section */}
            <section id="projects" className={styles.section}>
                <Projects />
            </section>

            {/* Contact Section */}
            <section id="contact" className={styles.section}>
                <Contact />
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Ferdy Nuriawan</h3>
                            <p className={styles.footerDescription}>
                                Full Stack Developer passionate about creating innovative
                                web applications and IoT solutions.
                            </p>
                            <div className={styles.footerSocials}>
                                <a href="https://linkedin.com/in/ferdy-nuriawan" target="_blank" rel="noopener noreferrer">
                                    💼 LinkedIn
                                </a>
                                <a href="https://github.com/05nrwn" target="_blank" rel="noopener noreferrer">
                                    🔗 GitHub
                                </a>
                                <a href="mailto:true.nrwn4868@gmail.com">
                                    📧 Email
                                </a>
                            </div>
                        </div>

                        <div className={styles.footerSection}>
                            <h4 className={styles.footerSubtitle}>Quick Links</h4>
                            <ul className={styles.footerLinks}>
                                <li><a href="#about">About Me</a></li>
                                <li><a href="#experience">Experience</a></li>
                                <li><a href="#education">Education</a></li>
                                <li><a href="#skills">Skills</a></li>
                                <li><a href="#projects">Projects</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className={styles.footerSection}>
                            <h4 className={styles.footerSubtitle}>Services</h4>
                            <ul className={styles.footerLinks}>
                                <li>Web Development</li>
                                <li>Mobile App Development</li>
                                <li>IoT Solutions</li>
                                <li>Database Design</li>
                                <li>System Integration</li>
                                <li>Technical Consulting</li>
                            </ul>
                        </div>

                        <div className={styles.footerSection}>
                            <h4 className={styles.footerSubtitle}>Technologies</h4>
                            <div className={styles.footerTechs}>
                                <span>React</span>
                                <span>PHP</span>
                                <span>CodeIgniter</span>
                                <span>MySQL</span>
                                <span>JavaScript</span>
                                <span>Arduino</span>
                                <span>IoT</span>
                                <span>Bootstrap</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <div className={styles.footerCopyright}>
                            <p>&copy; 2024 Ferdy Nuriawan. All rights reserved.</p>
                        </div>
                        <div className={styles.footerMeta}>
                            <span>Made with ❤️ using React</span>
                            <span>•</span>
                            <span>Jember, Indonesia</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <ScrollToTopButton />
        </div>
    );
};

// Scroll to Top Component
const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            ↑
        </button>
    );
};

export default CVPortfolio;
