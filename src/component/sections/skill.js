import React, { useState } from 'react';
import styles from './skill.module.css';

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('technical');

    const skillsData = {
        technical: {
            title: "Technical Skills",
            icon: "⚡",
            skills: [
                { name: "JavaScript", level: 90, category: "Frontend", icon: "🟨", experience: "2+ years" },
                { name: "React.js", level: 85, category: "Frontend", icon: "⚛️", experience: "1+ years" },
                { name: "PHP", level: 95, category: "Backend", icon: "🐘", experience: "2+ years" },
                { name: "CodeIgniter", level: 90, category: "Framework", icon: "🔥", experience: "2+ years" },
                { name: "MySQL", level: 88, category: "Database", icon: "🗄️", experience: "2+ years" },
                { name: "HTML5", level: 95, category: "Frontend", icon: "🌐", experience: "2+ years" },
                { name: "CSS3", level: 90, category: "Frontend", icon: "🎨", experience: "2+ years" },
                { name: "Bootstrap", level: 85, category: "Framework", icon: "📱", experience: "2+ years" },
                { name: "Node.js", level: 75, category: "Backend", icon: "🟢", experience: "1+ years" },
                { name: "Express.js", level: 70, category: "Backend", icon: "🚂", experience: "1+ years" },
                { name: "MongoDB", level: 65, category: "Database", icon: "🍃", experience: "6+ months" },
                { name: "Git", level: 80, category: "Tools", icon: "📝", experience: "2+ years" }
            ]
        },
        iot: {
            title: "IoT & Hardware",
            icon: "🔧",
            skills: [
                { name: "Arduino", level: 85, category: "Hardware", icon: "🤖", experience: "1+ years" },
                { name: "ESP32", level: 80, category: "Microcontroller", icon: "📡", experience: "1+ years" },
                { name: "Sensor Integration", level: 85, category: "Hardware", icon: "📊", experience: "1+ years" },
                { name: "WebSocket", level: 75, category: "Communication", icon: "🔄", experience: "1+ years" },
                { name: "MQTT Protocol", level: 70, category: "IoT Protocol", icon: "📨", experience: "6+ months" },
                { name: "Circuit Design", level: 65, category: "Hardware", icon: "⚡", experience: "6+ months" }
            ]
        },
        tools: {
            title: "Tools & Software",
            icon: "🛠️",
            skills: [
                { name: "VS Code", level: 95, category: "IDE", icon: "💻", experience: "2+ years" },
                { name: "GitHub", level: 85, category: "Version Control", icon: "🐙", experience: "2+ years" },
                { name: "Postman", level: 80, category: "API Testing", icon: "📮", experience: "1+ years" },
                { name: "phpMyAdmin", level: 90, category: "Database Tool", icon: "🗃️", experience: "2+ years" },
                { name: "XAMPP", level: 85, category: "Development", icon: "🔧", experience: "2+ years" },
                { name: "Figma", level: 70, category: "Design", icon: "🎨", experience: "1+ years" },
                { name: "Arduino IDE", level: 80, category: "IDE", icon: "🤖", experience: "1+ years" },
                { name: "FileZilla", level: 75, category: "FTP Client", icon: "📁", experience: "1+ years" }
            ]
        },
        soft: {
            title: "Soft Skills",
            icon: "🧠",
            skills: [
                { name: "Problem Solving", level: 90, category: "Analytical", icon: "🧩", experience: "Always learning" },
                { name: "Team Collaboration", level: 85, category: "Teamwork", icon: "🤝", experience: "2+ years" },
                { name: "Project Management", level: 80, category: "Leadership", icon: "📋", experience: "1+ years" },
                { name: "Communication", level: 85, category: "Interpersonal", icon: "💬", experience: "Always improving" },
                { name: "Adaptability", level: 90, category: "Personal", icon: "🔄", experience: "Always learning" },
                { name: "Time Management", level: 85, category: "Productivity", icon: "⏰", experience: "Daily practice" },
                { name: "Critical Thinking", level: 88, category: "Analytical", icon: "🤔", experience: "Continuous development" },
                { name: "Learning Agility", level: 95, category: "Growth", icon: "📚", experience: "Lifelong learner" }
            ]
        }
    };

    const categories = [
        { key: 'technical', label: 'Technical Skills', icon: '⚡' },
        { key: 'iot', label: 'IoT & Hardware', icon: '🔧' },
        { key: 'tools', label: 'Tools & Software', icon: '🛠️' },
        { key: 'soft', label: 'Soft Skills', icon: '🧠' }
    ];

    const getSkillColor = (level) => {
        if (level >= 90) return styles.expert;
        if (level >= 80) return styles.advanced;
        if (level >= 70) return styles.intermediate;
        if (level >= 60) return styles.beginner;
        return styles.learning;
    };

    const getSkillLevel = (level) => {
        if (level >= 90) return "Expert";
        if (level >= 80) return "Advanced";
        if (level >= 70) return "Intermediate";
        if (level >= 60) return "Beginner";
        return "Learning";
    };

    const currentSkills = skillsData[activeCategory];

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Skills & Expertise</h1>
            <p className={styles.subtitle}>
                Teknologi dan keahlian yang saya kuasai dalam pengembangan aplikasi dan solusi digital
            </p>

            {/* Category Filter */}
            <div className={styles.categoryFilter}>
                {categories.map(category => (
                    <button
                        key={category.key}
                        className={`${styles.categoryButton} ${activeCategory === category.key ? styles.active : ''}`}
                        onClick={() => setActiveCategory(category.key)}
                    >
                        <span className={styles.categoryIcon}>{category.icon}</span>
                        <span className={styles.categoryLabel}>{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Skills Section */}
            <div className={styles.skillsSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>{currentSkills.icon}</span>
                        {currentSkills.title}
                    </h2>
                </div>

                <div className={styles.skillsGrid}>
                    {currentSkills.skills.map((skill, index) => (
                        <div key={index} className={styles.skillCard}>
                            <div className={styles.skillHeader}>
                                <div className={styles.skillInfo}>
                                    <span className={styles.skillIcon}>{skill.icon}</span>
                                    <div className={styles.skillDetails}>
                                        <h3 className={styles.skillName}>{skill.name}</h3>
                                        <span className={styles.skillCategory}>{skill.category}</span>
                                    </div>
                                </div>
                                <div className={styles.skillMeta}>
                                    <span className={`${styles.skillLevel} ${getSkillColor(skill.level)}`}>
                                        {getSkillLevel(skill.level)}
                                    </span>
                                    <span className={styles.skillPercentage}>{skill.level}%</span>
                                </div>
                            </div>

                            <div className={styles.skillProgress}>
                                <div className={styles.progressBar}>
                                    <div
                                        className={`${styles.progressFill} ${getSkillColor(skill.level)}`}
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className={styles.skillFooter}>
                                <span className={styles.skillExperience}>
                                    📅 {skill.experience}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Summary */}
            <div className={styles.skillsSummary}>
                <h3 className={styles.summaryTitle}>Skills Overview</h3>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon}>🎯</div>
                        <div className={styles.summaryContent}>
                            <h4>Core Strength</h4>
                            <p>Full Stack Web Development dengan fokus pada PHP & JavaScript</p>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon}>🚀</div>
                        <div className={styles.summaryContent}>
                            <h4>Specialization</h4>
                            <p>IoT Solutions & Web Application Development</p>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon}>📈</div>
                        <div className={styles.summaryContent}>
                            <h4>Growth Mindset</h4>
                            <p>Terus belajar teknologi baru dan mengikuti trend industri</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Goals */}
            <div className={styles.learningGoals}>
                <h3 className={styles.goalsTitle}>Currently Learning</h3>
                <div className={styles.goalsTags}>
                    {["Vue.js", "Docker", "AWS", "TypeScript", "Next.js", "Python"].map((goal, index) => (
                        <span key={index} className={styles.goalTag}>
                            📚 {goal}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;
