import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


const Otpver = () => {
    const [formOtp, setFormOtp] = useState('');
    const [error, setError] = useState(null); // State to hold error messages
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleChange = (e) => {
        setFormOtp(e.target.value);
    };
    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         const response = await axios.post('http://localhost:5000/signup/otp-verify', { otp: formOtp }, { withCredentials: true, });


         // Check if the response contains the redirectTo property
         if (response.data.redirectTo) {
            // Redirect to the specified route
            navigate(response.data.redirectTo);
        } else {
           
        }

            console.log('OTP verification successful:', response.data);
            // You can navigate to the login page or show a success message here
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
        <div className="form-verify-otp">
            <h2>Verify OTP</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="otp">OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={formOtp}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Otpver;
