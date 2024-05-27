
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


  const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/login', formData, { withCredentials: true });


    // Check if the response contains the redirectTo property
    if (response.data.redirectTo) {
       // Redirect to the specified route
       navigate(response.data.redirectTo);
   } else {
      
   }
  }catch(error){
    console.log(error)
  } 
  };



  
    return ( 
      
      <div className="LoginFormContainer">
      <div className="LoginForm">
        <h2 className="LoginFormTitle">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="LoginFormField">
            <label htmlFor="email"  className="LoginFormLabel">Email:</label>
            <input
            placeholder="Add Your Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="LoginFormInput"
              required
            />
          </div>
          <div className="LoginFormField">
            <label htmlFor="password" placeholder = " Add Your Password " className="LoginFormLabel">Password:</label>
            <input
            placeholder="Add Your Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="LoginFormInput"
              required
            />
          </div>
          <button type="submit" className="LoginFormButton">Login</button>
        </form>
        <div class="additional-info">
        <p className='InfoMore'>Not Registred ? Head to  <a href="http://localhost:3000/signup">Login page</a></p>
        <p>For any inquiries, please contact us at <a href="mailto:info@example.com">abdullahaliquadri@gmail.com</a></p>
  
    </div>

      </div>
    </div>
 




     );
}
 
export default Login;