import React from 'react';
import styles from './about.module.css';

const About = () => {
    const personalInfo = {
        name: "Ferdy Nuriawan",
        title: "Full Stack Developer",
        email: "true.nrwn4868@gmail.com",
        phone: "+63 111 760 846",
        location: "Jember, Indonesia",
        linkedin: "linkedin.com/in/ferdy-nuriawan",
        github: "github.com/05nrwn",
        profileImage: "/images/profile.jpg"
    };

    const stats = [
        {
            id: 1,
            number: "2+",
            label: "Tahun Pengalaman",
            icon: "⏱️"
        },
        {
            id: 2,
            number: "10+",
            label: "Proyek Selesai",
            icon: "🚀"
        },
        {
            id: 3,
            number: "5+",
            label: "Klien Puas",
            icon: "😊"
        },
        {
            id: 4,
            number: "3.69",
            label: "IPK",
            icon: "🎓"
        }
    ];

    const highlights = [
        {
            id: 1,
            title: "Passion",
            description: "Passionate tentang pengembangan web dan teknologi terbaru",
            icon: "❤️"
        },
        {
            id: 2,
            title: "Innovation",
            description: "Selalu mencari solusi inovatif untuk setiap tantangan",
            icon: "💡"
        },
        {
            id: 3,
            title: "Quality",
            description: "Berkomitmen memberikan kualitas terbaik dalam setiap project",
            icon: "⭐"
        }
    ];

    return (
        <div className={styles.container}>
            {/* Header Profile */}
            <div className={styles.header}>
                <div className={styles.profileImageContainer}>
                    <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.name}
                        className={styles.profileImage}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x200?text=Profile";
                        }}
                    />
                </div>
                <div className={styles.profileInfo}>
                    <h1 className={styles.name}>{personalInfo.name}</h1>
                    <h2 className={styles.title}>{personalInfo.title}</h2>
                    <p className={styles.description}>
                        Seorang Full Stack Developer yang berpengalaman dalam membangun
                        aplikasi web modern dengan teknologi terkini. Memiliki passion
                        dalam menciptakan solusi digital yang inovatif dan user-friendly.
                    </p>
                    <div className={styles.contactInfo}>
                        <span>{personalInfo.email}</span>
                        <span>{personalInfo.phone}</span>
                        <span>{personalInfo.location}</span>
                        <span>{personalInfo.linkedin}</span>
                        <span>{personalInfo.github}</span>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Statistik Pencapaian</h2>
                <div className={styles.statsGrid}>
                    {stats.map(stat => (
                        <div key={stat.id} className={styles.statCard}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={styles.statNumber}>{stat.number}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Personal Highlights */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Yang Saya Tawarkan</h2>
                <div className={styles.grid}>
                    {highlights.map(highlight => (
                        <div key={highlight.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>{highlight.icon}</div>
                                <h3 className={styles.cardTitle}>{highlight.title}</h3>
                            </div>
                            <div className={styles.cardContent}>
                                <p className={styles.cardDescription}>{highlight.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission & Vision */}
            <section className={styles.section}>
                <div className={styles.missionVisionGrid}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Misi Saya</h3>
                        </div>
                        <div className={styles.cardContent}>
                            <p className={styles.cardDescription}>
                                Mengembangkan solusi teknologi yang memberikan dampak positif
                                bagi bisnis dan masyarakat melalui aplikasi web yang berkualitas
                                tinggi dan user experience yang exceptional.
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Visi Saya</h3>
                        </div>
                        <div className={styles.cardContent}>
                            <p className={styles.cardDescription}>
                                Menjadi Full Stack Developer yang dikenal karena kemampuan
                                teknis yang solid, kreativitas dalam problem solving, dan
                                kontribusi dalam pengembangan teknologi digital Indonesia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
