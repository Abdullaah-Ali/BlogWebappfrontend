import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000', {
          withCredentials: true
        });
        console.log('Fetched blogs:', res.data);  // Debugging log
        setBlogs(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An error occurred while fetching the blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to format date as day month year
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found.</div>;
  }

  return (
    <div className="home">
      <h2>Total Blogs</h2>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div className="blog-preview" key={blog._id}>
            <Link to={`/blogs/${encodeURIComponent(blog.title)}`}>
              <h2>{blog.title}</h2>
            </Link>

            <p>{blog.description}</p>
            <p>Written by {blog.author}</p>
            <p>Publish At {formatDate(blog.createdat)}</p> {/* Format date here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
