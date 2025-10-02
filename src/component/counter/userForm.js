import React, { useState } from 'react';
function UserForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        subscribe: false
    });
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`
Form Submitted!
Name: ${formData.name}
Email: ${formData.email}
Age: ${formData.age}
Subscribe: ${formData.subscribe ? 'Yes' : 'No'}
`);
    };
    return (
        <form onSubmit={handleSubmit} style={{
            padding: '20px',
            border: '2px solid #28a745',
            borderRadius: '8px',
            maxWidth: '400px',
            margin: '20px auto'
        }}>
            <h2>User Registration Form</h2>
            <div style={{ marginBottom: '15px' }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    /></label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="1"
                        max="120"
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label>
                    <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleInputChange}
                        style={{ marginRight: '10px' }}
                    />
                    Subscribe to newsletter
                </label>
            </div>
            <button
                type="submit"
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                Submit
            </button>
            {/* Live Preview */}
            <div style={{
                marginTop: '20px', padding: '10px',
                backgroundColor: '#f8f9fa'
            }}>
                <h3>Live Preview:</h3>
                <p>Name: {formData.name || 'Not provided'}</p>
                <p>Email: {formData.email || 'Not provided'}</p>
                <p>Age: {formData.age || 'Not provided'}</p>
                <p>Subscribe: {formData.subscribe ? 'Yes' : 'No'}</p>
            </div>
        </form>
    );
}
export default UserForm;
