import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory


const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

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
            const response = await axios.post('http://localhost:5000/signup', formData, {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true 
              });

            // Check if the response contains the redirectTo property
            if (response.data.redirectTo) {
                // Redirect to the specified route
                navigate(response.data.redirectTo);
            } else {
                // Handle other scenarios if needed
            }

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                setError('Server error. Please try again later.');
                console.error(' Server Error:', error.response.data);
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
    <h2>Registration Form</h2>
    <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>} {/* Display error message if there is one */}
        <div className="form-group">
            <input type="text"placeholder='Add Your Name' id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
            
            <input type="email" placeholder='Add Your Email' id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
            <input type="password" placeholder = 'Add Your password ' id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
            <input type="password" placeholder = 'Confirm Your password ' id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
    </form>
    <div class="additional-info">
        <p className='InfoMore'>Already Registered? Head to <a href="http://localhost:3000/login">Login page</a></p>
        <p>For any inquiries, please contact us at <a href="mailto:info@example.com">abdullahaliquadri@gmail.com</a></p>
  
    </div>

</div>

    );
}

export default Signup;
