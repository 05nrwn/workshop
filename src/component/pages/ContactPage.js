import React, { useState } from 'react';
import styles from '.././sections/contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We\'ll get back to you soon.');
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: '📧',
            title: 'Email',
            description: 'Send us a message',
            contact: 'hello@example.com'
        },
        {
            icon: '📱',
            title: 'Phone',
            description: 'Give us a call',
            contact: '+1 (555) 123-4567'
        },
        {
            icon: '📍',
            title: 'Location',
            description: 'Visit our office',
            contact: '123 Business St, City, State 12345'
        },
        {
            icon: '🕒',
            title: 'Office Hours',
            description: 'We\'re available',
            contact: 'Mon-Fri: 9AM-6PM'
        }
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Get In Touch</h2>

            {/* Contact Information Cards */}
            <div className={styles.grid}>
                {contactInfo.map((info, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardIcon}>{info.icon}</div>
                            <h3 className={styles.cardTitle}>{info.title}</h3>
                            <p className={styles.cardDescription}>{info.description}</p>
                            <p className={styles.cardContact}>{info.contact}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contact Form Card */}
            <div className={styles.formContainer}>
                <div className={styles.formCard}>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>Send us a Message</h3>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={styles.textarea}
                                    rows="6"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className={styles.cardButton}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
