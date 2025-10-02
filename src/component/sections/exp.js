import React from 'react';
import styles from './exp.module.css';

const Experience = () => {
    const personalInfo = {
        name: "Ferdy Nuriawan",
        title: "Full Stack Developer",
        email: "true.nrwn4868@gmail.com",
        phone: "+6283 111 760 846",
        location: "Jember",
        linkedin: "linkedin.com",
        github: "github.com/05nrwn"
    };

    const experiences = [
        {
            id: 1,
            position: "Freelance Developer",
            company: "PT. Ganeshaka Technology Indonesia, Jember",
            duration: "Jan 2024 - Sekarang",
            location: "Jember",
            responsibilities: [
                "Membangun dan mengembangkan aplikasi website sistem penjamin mutu internal untuk pemantauanaudit instansi.", "Membangun dan mengembangkan produk IoT berupa sistem monitor yang ditempatkan pada alat penggoreng kopi."

            ]
        },
        {
            id: 2,
            position: "Web Developer Intern",
            company: "CV. Esolusindo, Jember",
            duration: "2023 - 2024",
            location: "Jember",
            responsibilities: [
                "Bekerja sama dalam tim dalam membuat website sistem informasi kesehatan puskesmas dan memberikan dukungan yang dibutuhkan.",
                "Berkolaborasi dengan programmer lain untuk mengembangkan website dan mengimplementasikan fitur website yang perlukan klien.",
                "Merancang dan membangun website dengan framework codeigniter dan menggunakan bahasa HTML, PHP, CSS, dan JavaScript.",
            ]
        },
    ];

    const education = [
        {
            id: 1,
            degree: "D3 Manajemen Informatika",
            institution: "Politeknik Negeri Jember, Jember",
            duration: "2021 - 2024",
            gpa: "3.69/4.0",
            relevant: ["Data Structures", "Algorithms", "Web Development", "Database Systems"]
        }
    ];

    const skills = {
        technical: [
            "JavaScript (ES6+)", "React", "TypeScript", "Node.js",
            "Python", "HTML5", "CSS3", "Git", "PostgreSQL"
        ],
        tools: [
            "VS Code", "Webpack", "Docker", "AWS", "Slack"
        ],
        soft: [
            "Team Leadership", "Problem Solving", "Communication", "Project Management",
            "Mentoring", "Agile Methodologies"
        ]
    };

    const projects = [
        {
            id: 1,
            name: "Sistem Penjamin Mutu Internal",
            description: "Sistem informasi berbasis web untuk mendukung proses penjaminan mutu internal di Politeknik Negeri Jember. Sistem ini memfasilitasi monitoring dan evaluasi standar mutu akademik, administrasi, dan layanan mahasiswa secara real-time dengan dashboard analytics dan pelaporan otomatis.",
            technologies: ["PHP", "Laravel", "Javascript"],
        },
        {
            id: 2,
            name: "IoT Kopi Monitoring Penggorengan Mesin Kopi",
            description: "Sistem IoT untuk memantau proses penggorengan kopi secara real-time. Sistem ini menggunakan sensor suhu dan kelembaban yang terhubung ke mikrokontroler untuk mengirim data ke aplikasi web. Pengguna dapat memantau kondisi penggorengan, mengatur parameter, dan menerima notifikasi melalui aplikasi web.",
            technologies: ["Arduino", "Firebase", "Socket.io", "Artisan", "Flutter"],
        }
    ];

    const certifications = [
        {
            id: 1,
            name: "Sertifikat Kewirausahaan Industri-Jenjang IV (BNSP)",
            issuer: "Kementrian Pendidikan, Kebudayaan, Riset, dan Teknologi",
            date: "2023"
        },
        {
            id: 2,
            name: "Sertifikat Junior Mobile Programmer (BNSP)",
            issuer: "Kementrian Pendidikan, Kebudayaan, Riset, dan Teknologi",
            date: "2022"
        }
    ];

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <h1 className={styles.name}>{personalInfo.name}</h1>
                <h2 className={styles.title}>{personalInfo.title}</h2>
                <div className={styles.contactInfo}>
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                    <span>{personalInfo.location}</span>
                    <span>{personalInfo.linkedin}</span>
                    <span>{personalInfo.github}</span>
                </div>
            </div>

            {/* Experience Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Professional Experience</h2>
                <div className={styles.grid}>
                    {experiences.map(exp => (
                        <div key={exp.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{exp.position}</h3>
                                <div className={styles.cardSubtitle}>
                                    <span className={styles.company}>{exp.company}</span>
                                    <span className={styles.duration}>{exp.duration}</span>
                                </div>
                                <span className={styles.location}>{exp.location}</span>
                            </div>
                            <div className={styles.cardContent}>
                                <ul className={styles.responsibilities}>
                                    {exp.responsibilities.map((responsibility, index) => (
                                        <li key={index}>{responsibility}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>
                <div className={styles.grid}>
                    {education.map(edu => (
                        <div key={edu.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{edu.degree}</h3>
                                <div className={styles.cardSubtitle}>
                                    <span className={styles.company}>{edu.institution}</span>
                                    <span className={styles.duration}>{edu.duration}</span>
                                </div>
                                <span className={styles.gpa}>GPA: {edu.gpa}</span>
                            </div>
                            <div className={styles.cardContent}>
                                <p><strong>Relevant Coursework:</strong></p>
                                <div className={styles.tags}>
                                    {edu.relevant.map((course, index) => (
                                        <span key={index} className={styles.tag}>{course}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <div className={styles.skillsGrid}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Technical Skills</h3>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.tags}>
                                {skills.technical.map((skill, index) => (
                                    <span key={index} className={styles.tag}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Tools & Technologies</h3>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.tags}>
                            {skills.tools.map((tool, index) => (
                                <span key={index} className={styles.tag}>{tool}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Soft Skills</h3>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.tags}>
                            {skills.soft.map((skill, index) => (
                                <span key={index} className={styles.tag}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
            </section >

    {/* Projects Section */ }
    < section className = { styles.section } >
                <h2 className={styles.sectionTitle}>Notable Projects</h2>
                <div className={styles.grid}>
                    {projects.map(project => (
                        <div key={project.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{project.name}</h3>
                            </div>
                            <div className={styles.cardContent}>
                                <p className={styles.cardDescription}>{project.description}</p>
                                <div className={styles.tags}>
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className={styles.tag}>{tech}</span>
                                    ))}
                                </div>
                                <a href={`https://${project.link}`} className={styles.cardButton} target="_blank" rel="noopener noreferrer">
                                    View Project
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section >

    {/* Certifications Section */ }
    < section className = { styles.section } >
                <h2 className={styles.sectionTitle}>Certifications</h2>
                <div className={styles.grid}>
                    {certifications.map(cert => (
                        <div key={cert.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{cert.name}</h3>
                                <div className={styles.cardSubtitle}>
                                    <span className={styles.company}>{cert.issuer}</span>
                                    <span className={styles.duration}>{cert.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section >
        </div >
    );
};

export default Experience;
