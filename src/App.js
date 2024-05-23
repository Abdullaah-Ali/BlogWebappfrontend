import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Importing index.css

import './App.css';
import Navbar from './Navbar';
import Home from './home'


function App() {


  return (
    <Router>

    <div className="App">
    <Navbar/>

      <div className="content"> 
    < Routes>
    <Route path = "/" element = { <Home/>}/>
    </Routes>
    
    <home/>
    </div>
    </div>

</Router>

  );
}

export default App;
