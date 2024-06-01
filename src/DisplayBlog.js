import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import formattedDate from './CreateBlog'
const DisplayBlog = () => {
  const { title } = useParams(); // Extract title from URL params
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetch data triggered");
      try {
        const res = await axios.get(`http://localhost:5000/blogs/${encodeURIComponent(title)}`, {
          withCredentials: true
        });
        console.log("Response received:", res.data);
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An error occurred while fetching the blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]); // Update useEffect dependency to include title

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>No blog post found.</div>;
  }

  return (
<div class="blog-preview">
  <h2>{blog.title}</h2>
  <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
  <div class="blog-info">
    <p class="author">Author: {blog.author}</p>
    <p class="date">Published: { formattedDate }</p>
    
    <p class="read-time"> mins</p>
  </div>
</div>
  )
};

export default DisplayBlog;
