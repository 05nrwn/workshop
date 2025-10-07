import React from 'react';
import styles from '../sections/skill.module.css';

const ServicesPage = () => {
    const services = [
        {
            id: 1,
            title: "Web Development",
            description: "Full-stack web development using modern technologies like React, Node.js, and databases",
            icon: "🌐",
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            features: [
                "Responsive Design",
                "SEO Optimization",
                "Performance Optimization",
                "Cross-browser Compatibility"
            ]
        },
        {
            id: 2,
            title: "Database Design",
            description: "Efficient database architecture and optimization for scalable applications",
            icon: "🗄️",
            technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
            features: [
                "Database Modeling",
                "Query Optimization",
                "Data Migration",
                "Backup Solutions"
            ]
        },
        {
            id: 3,
            title: "API Development",
            description: "RESTful APIs and GraphQL services for seamless data integration",
            icon: "🔗",
            technologies: ["REST", "GraphQL", "Node.js", "Express"],
            features: [
                "API Documentation",
                "Authentication & Security",
                "Rate Limiting",
                "Version Control"
            ]
        },
    ];

    const processSteps = [
        {
            step: "01",
            title: "Discovery",
            description: "Understanding your requirements and project scope"
        },
        {
            step: "02",
            title: "Planning",
            description: "Creating detailed project timeline and milestones"
        },
        {
            step: "03",
            title: "Development",
            description: "Building your solution with regular updates"
        },
        {
            step: "04",
            title: "Testing",
            description: "Thorough testing and quality assurance"
        },
        {
            step: "05",
            title: "Deployment",
            description: "Launching your project and providing support"
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.skillsSection}>
                <div className={styles.content}>
                    {/* Page Header */}
                    <div className={styles.header}>
                        <h1 className={styles.title}>My Services</h1>
                        <p className={styles.subtitle}>Professional development services to bring your ideas to life</p>
                    </div>

                    {/* Services Grid */}
                    <div className={styles.skillsGrid}>
                        {services.map((service) => (
                            <div key={service.id} className={styles.skillCard}>
                                <div className={styles.skillHeader}>
                                    <span className={styles.skillIcon}>{service.icon}</span>
                                    <h3 className={styles.skillName}>{service.title}</h3>
                                </div>

                                <p className={styles.skillDescription}>{service.description}</p>

                                {/* Technologies */}
                                <div className={styles.techSection}>
                                    <h4 className={styles.techTitle}>Technologies:</h4>
                                    <div className={styles.techList}>
                                        {service.technologies.map((tech, index) => (
                                            <span key={index} className={styles.techTag}>{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className={styles.featuresSection}>
                                    <h4 className={styles.featuresTitle}>What's Included:</h4>
                                    <ul className={styles.featuresList}>
                                        {service.features.map((feature, index) => (
                                            <li key={index} className={styles.featureItem}>
                                                <span className={styles.featureCheck}>✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Process Section */}
                    <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>⚙️</span>
                            My Development Process
                        </h2>
                        <div className={styles.skillsGrid} style={{ marginTop: '2rem' }}>
                            {processSteps.map((step, index) => (
                                <div key={index} className={styles.skillCard} style={{
                                    textAlign: 'center',
                                    position: 'relative',
                                    borderLeftColor: '#27ae60'
                                }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                        color: '#27ae60',
                                        marginBottom: '1rem',
                                        background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>
                                        {step.step}
                                    </div>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {step.title}
                                        </h3>
                                        <p style={{
                                            color: '#7f8c8d',
                                            lineHeight: '1.6',
                                            fontSize: '0.95rem'
                                        }}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className={styles.skillCard} style={{
                        textAlign: 'center',
                        marginTop: '4rem',
                        padding: '3rem 2rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderLeft: 'none'
                    }}>
                        <h2 style={{
                            fontSize: '2.2rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            color: 'white'
                        }}>
                            Ready to Start Your Project?
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            marginBottom: '2rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: '1.6',
                            maxWidth: '600px',
                            margin: '0 auto 2rem auto'
                        }}>
                            Let's discuss how I can help bring your ideas to life with professional development services.
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <a
                                href="/contact"
                                className={styles.categoryButton}
                                style={{
                                    backgroundColor: '#27ae60',
                                    color: 'white',
                                    textDecoration: 'none',
                                    padding: '0.75rem 2rem',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    border: '2px solid #27ae60'
                                }}
                            >
                                Get Started
                            </a>
                            <a
                                href="/contact"
                                className={styles.categoryButton}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    textDecoration: 'none',
                                    padding: '0.75rem 2rem',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    border: '2px solid white'
                                }}
                            >
                                Schedule a Call
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
