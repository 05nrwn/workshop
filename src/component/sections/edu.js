import React from 'react';
import styles from './edu.module.css';

const Education = () => {
    const educationData = [
        {
            id: 1,
            degree: "D3 Manajemen Informatika",
            institution: "Politeknik Negeri Jember",
            duration: "2021 - 2024",
            location: "Jember, Indonesia",
            gpa: "3.69/4.0",
            status: "Lulus",
            description: "Program Diploma 3 yang fokus pada pengembangan sistem informasi dan manajemen teknologi informasi.",
            relevant: [
                "Pemrograman Web",
                "Database Management",
                "Sistem Informasi",
                "Algoritma & Struktur Data",
                "Jaringan Komputer",
                "UI/UX Design"
            ],
            achievements: [
                "IPK Cumlaude (3.69/4.0)",
                "Menyelesaikan Final Project dengan nilai A",
                "Aktif dalam organisasi kemahasiswaan",
                "Mengikuti berbagai workshop teknologi"
            ]
        }
    ];

    const courses = [
        {
            id: 1,
            title: "Full Stack Web Development",
            provider: "Online Course",
            duration: "2023",
            skills: ["React", "Node.js", "MongoDB", "Express.js"],
            certificate: "Sertifikat"
        },
        {
            id: 2,
            title: "JavaScript Advanced Concepts",
            provider: "Udemy",
            duration: "2023",
            skills: ["ES6+", "Async/Await", "Promises", "DOM Manipulation"],
            certificate: "Sertifikat"
        },
        {
            id: 3,
            title: "Database Design & Management",
            provider: "Coursera",
            duration: "2022",
            skills: ["MySQL", "PostgreSQL", "Database Optimization", "SQL"],
            certificate: "Sertifikat"
        }
    ];

    const certifications = [
        {
            id: 1,
            name: "Web Developer Certification",
            issuer: "Politeknik Negeri Jember",
            date: "2024",
            description: "Sertifikasi kompetensi pengembangan web"
        },
        {
            id: 2,
            name: "Database Management Certification",
            issuer: "Oracle Academy",
            date: "2023",
            description: "Sertifikasi manajemen database Oracle"
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Pendidikan & Sertifikasi</h1>

            {/* Formal Education Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Pendidikan Formal</h2>
                <div className={styles.grid}>
                    {educationData.map(edu => (
                        <div key={edu.id} className={styles.eduCard}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{edu.degree}</h3>
                                <div className={styles.cardSubtitle}>
                                    <span className={styles.institution}>{edu.institution}</span>
                                    <span className={styles.duration}>{edu.duration}</span>
                                </div>
                                <div className={styles.cardMeta}>
                                    <span className={styles.location}>📍 {edu.location}</span>
                                    <span className={styles.gpa}>🎓 IPK: {edu.gpa}</span>
                                    <span className={styles.status}>✅ {edu.status}</span>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <p className={styles.cardDescription}>{edu.description}</p>

                                <div className={styles.subsection}>
                                    <h4 className={styles.subsectionTitle}>Mata Kuliah Relevan:</h4>
                                    <div className={styles.tags}>
                                        {edu.relevant.map((course, index) => (
                                            <span key={index} className={styles.tag}>{course}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.subsection}>
                                    <h4 className={styles.subsectionTitle}>Pencapaian:</h4>
                                    <ul className={styles.achievements}>
                                        {edu.achievements.map((achievement, index) => (
                                            <li key={index}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Online Courses Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Kursus & Pelatihan</h2>
                <div className={styles.grid}>
                    {courses.map(course => (
                        <div key={course.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{course.title}</h3>
                                <div className={styles.cardSubtitle}>
                                    <span className={styles.provider}>{course.provider}</span>
                                    <span className={styles.duration}>{course.duration}</span>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.subsection}>
                                    <h4 className={styles.subsectionTitle}>Skills yang Dipelajari:</h4>
                                    <div className={styles.tags}>
                                        {course.skills.map((skill, index) => (
                                            <span key={index} className={styles.tag}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.certificateBadge}>
                                    🏆 {course.certificate}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Sertifikasi Profesional</h2>
                <div className={styles.grid}>
                    {certifications.map(cert => (
                        <div key={cert.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{cert.name}</h3>
                                <div className={styles.cardSubtitle}>
                                    <span className={styles.issuer}>{cert.issuer}</span>
                                    <span className={styles.date}>{cert.date}</span>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <p className={styles.cardDescription}>{cert.description}</p>
                                <div className={styles.certificateBadge}>
                                    📜 Sertifikat Terverifikasi
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Education;
