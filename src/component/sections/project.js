import React, { useState } from 'react';
import styles from './project.module.css';

const Project = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const projects = [
        {
            id: 1,
            title: "Sistem Penjamin Mutu Internal",
            category: "web-app",
            description: "Aplikasi website untuk pemantauan audit instansi dengan fitur manajemen dokumen, tracking audit, dan pelaporan real-time.",
            image: "/images/project1.jpg",
            technologies: ["PHP", "CodeIgniter", "MySQL", "Bootstrap", "JavaScript"],
            features: [
                "Dashboard monitoring real-time",
                "Manajemen dokumen audit",
                "Sistem notifikasi otomatis",
                "Laporan audit terintegrasi"
            ],
            status: "Completed",
            duration: "3 Bulan",
            client: "PT. Ganeshaka Technology Indonesia",
            year: "2024",
            link: "#",
            github: "#"
        },
        {
            id: 2,
            title: "IoT Coffee Roasting Monitor",
            category: "iot",
            description: "Sistem monitoring IoT untuk alat penggoreng kopi dengan sensor suhu, kelembaban, dan kontrol otomatis untuk memastikan kualitas roasting optimal.",
            image: "/images/project2.jpg",
            technologies: ["Arduino", "ESP32", "PHP", "MySQL", "Chart.js", "WebSocket"],
            features: [
                "Monitoring suhu real-time",
                "Kontrol otomatis roasting",
                "Data logging & analytics",
                "Alert system"
            ],
            status: "Completed",
            duration: "2 Bulan",
            client: "PT. Ganeshaka Technology Indonesia",
            year: "2024",
            link: "#",
            github: "#"
        },
        {
            id: 3,
            title: "Sistem Informasi Kesehatan Puskesmas",
            category: "web-app",
            description: "Website sistem informasi kesehatan untuk puskesmas dengan fitur registrasi pasien, rekam medis digital, dan manajemen inventory obat.",
            image: "/images/project3.jpg",
            technologies: ["CodeIgniter", "PHP", "MySQL", "HTML", "CSS", "JavaScript"],
            features: [
                "Registrasi pasien online",
                "Rekam medis digital",
                "Manajemen inventory obat",
                "Sistem antrian otomatis"
            ],
            status: "Completed",
            duration: "4 Bulan",
            client: "CV. Esolusindo",
            year: "2023",
            link: "#",
            github: "#"
        },
    ];

    const filterCategories = [
        { id: 'all', label: 'Semua Project', count: projects.length },
        { id: 'web-app', label: 'Web Application', count: projects.filter(p => p.category === 'web-app').length },
        { id: 'iot', label: 'IoT Projects', count: projects.filter(p => p.category === 'iot').length },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return styles.statusCompleted;
            case 'In Development': return styles.statusInProgress;
            case 'Planning': return styles.statusPlanning;
            default: return styles.statusDefault;
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Portfolio Proyek</h1>
            <p className={styles.subtitle}>
                Koleksi proyek yang telah saya kerjakan dengan berbagai teknologi dan platform
            </p>

            {/* Filter Section */}
            <div className={styles.filterSection}>
                {filterCategories.map(category => (
                    <button
                        key={category.id}
                        className={`${styles.filterButton} ${activeFilter === category.id ? styles.active : ''}`}
                        onClick={() => setActiveFilter(category.id)}
                    >
                        {category.label} ({category.count})
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className={styles.projectsGrid}>
                {filteredProjects.map(project => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.cardImageContainer}>
                            <img
                                src={project.image}
                                alt={project.title}
                                className={styles.cardImage}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/400x250?text=Project+Image";
                                }}
                            />
                            <div className={styles.imageOverlay}>
                                <div className={styles.overlayButtons}>
                                    <a href={project.link} className={styles.viewButton} target="_blank" rel="noopener noreferrer">
                                        👁️ View
                                    </a>
                                    <a href={project.github} className={styles.codeButton} target="_blank" rel="noopener noreferrer">
                                        💻 Code
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                <div className={styles.cardMeta}>
                                    <span className={`${styles.status} ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <span className={styles.year}>{project.year}</span>
                                </div>
                            </div>

                            <p className={styles.cardDescription}>{project.description}</p>

                            <div className={styles.projectDetails}>
                                <div className={styles.detailItem}>
                                    <strong>Client:</strong> {project.client}
                                </div>
                                <div className={styles.detailItem}>
                                    <strong>Duration:</strong> {project.duration}
                                </div>
                            </div>

                            <div className={styles.featuresSection}>
                                <h4 className={styles.featuresTitle}>Key Features:</h4>
                                <ul className={styles.featuresList}>
                                    {project.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.technologiesSection}>
                                <h4 className={styles.techTitle}>Technologies:</h4>
                                <div className={styles.techTags}>
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className={styles.techTag}>{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.cardActions}>
                                <a href={project.link} className={styles.primaryButton} target="_blank" rel="noopener noreferrer">
                                    Lihat Detail
                                </a>
                                {project.github && (
                                    <a href={project.github} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                                        Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className={styles.emptyState}>
                    <p>Tidak ada proyek yang ditemukan untuk kategori ini.</p>
                </div>
            )}
        </div>
    );
};

export default Project;
