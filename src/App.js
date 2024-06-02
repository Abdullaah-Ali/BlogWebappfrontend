import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Importing index.css

import './App.css';
import Navbar from './Navbar';
import Home from './home';
import Login from './Login';
import Signup from './Signup';
import Otpver from './Otpver';
import PageNotFound from './PageNotFound';
import CreateBlog  from './CreateBlog';
import DisplayBlog from './DisplayBlog'; // Adjust the path if necessary
import Profile from './Profile'

function App() {


  return (
    <Router>

    <div className="App">
    <Navbar/>

      <div className="content"> 
    < Routes>
    <Route path = "/" element = { <Home/>}/>
    <Route path = "/login" element = { <Login/>}/>
    <Route path = "/signup" element = { <Signup/>}/>
    <Route path = "/signup/otp-verify" element = { <Otpver/>}/>
    <Route path="*" element={<PageNotFound />} />
    <Route path = "/create-blog" element={<CreateBlog />} />
    <Route path="/blogs/:title" element={<DisplayBlog />} />
    <Route path = "/profile" element = { <Profile />}/>
   


    </Routes>
    
    <home/>
    </div>
    
    </div>

</Router>

  );
}

export default App;
