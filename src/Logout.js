
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
        
          await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
    
          navigate('/login');
        } catch (error) {
          console.log(error);
        }
      };

    return (     
        <button onClick={handleLogout} className="logout-button">Logout</button>
);
}
 
export default Logout;