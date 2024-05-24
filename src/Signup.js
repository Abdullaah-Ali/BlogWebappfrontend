import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [error, setError] = useState(null); // State to hold error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.confirm_password) {
            setError('Please fill in all fields.');
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', formData);
            console.log('Form submission successful:', response);
            console.log(formData)
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                setError('Server error. Please try again later.');
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                setError('No response from server. Please check your connection.');
                console.error('No Response:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An unexpected error occurred. Please try again.');
                console.error('Request Error:', error.message);
            }
        }
    };

    return (
        <div className="Form-signup">
            <h2>Signup Form</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>} {/* Display error message if there is one */}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Signup;
