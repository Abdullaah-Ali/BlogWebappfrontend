import Logout from './Logout';
const Navbar = () => {
    return ( 
        <nav className= " navbar">
            <h1> My Blogs Website </h1>
            <div className = "Links "> 
            <a href = "/">Home</a>
            <a href = "/login"> Login</a>
            <a href = "/signup"> Signup</a>
            <Logout />
            <a href= " /profile-edit"> Profile</a>
            <a href =  " /create-blog ">  Create Your Blog</a>
            </div>


        </nav>
    
    );
}
 


//completed 


export default Navbar;