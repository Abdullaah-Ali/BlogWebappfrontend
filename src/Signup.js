import { useState } from 'react';


const Signup = () => {
    
    
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });



      // Function to handle form input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any required fields are empty
        if (!formData.name || !formData.email || !formData.password || !formData.confirm_password) {
            alert('Please fill in all fields.');
            return;
        }
        // Proceed with form submission
        try {
            console.log('Form submission is done with the data if ' , formData.email)
            // Send data to backend using the api
        } catch (error) {

            console.error('Error occurred:', error);
        }
    };
    
    
    
  return ( 
    <div className="Form-signup">
        <h2>Signup Form</h2>
        <form onSubmit={handleSubmit}>
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