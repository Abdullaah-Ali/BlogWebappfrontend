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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
            <p>Written by {blog.author}</p>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
