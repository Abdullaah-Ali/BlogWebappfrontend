import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Importing index.css

import './App.css';
import Navbar from './Navbar';
import Home from './home';
import Login from './Login';
import Signup from './Signup';


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


    </Routes>
    
    <home/>
    </div>
    </div>

</Router>

  );
}

export default App;
