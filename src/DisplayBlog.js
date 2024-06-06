import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplayBlog = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/blogs/${encodeURIComponent(title)}`, {
          withCredentials: true
        });
        setBlog(res.data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching the blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/comments/${encodeURIComponent(title)}`);
      setComments(res.data);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching comments');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/comments/${encodeURIComponent(title)}`, { text: commentText }, {
        withCredentials: true
      });
      setComments(res.data);
      setCommentText('');
    } catch (error) {
      setError(error.message || 'An error occurred while posting the comment');
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) fetchComments();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No blog post found.</div>;

  const formattedDate = new Date(blog.createdat).toLocaleDateString();

  return (
    <div className="blog-preview">
      <h2>{blog.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      <div className="blog-info">
        <p className="author">Author: {blog.author}</p>
        <p className="date">Published: {formattedDate}</p>
      </div>
      <button onClick={toggleComments} className="bookmarkBtn">
        <span className="IconContainer">
          <svg fill="white" viewBox="0 0 512 512" height="1em"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path></svg>
        </span>
        <p className="text">View Comments</p>
      </button>
      {showComments && (
        <div className="comments-section">
          <h3>Comments By Users</h3>
          {comments.map((comment) => (
            <div key={comment._id} className="comment">

              <p><strong>{comment.username}</strong> </p>

              <p>{comment.text}</p>
              {/* Assuming author name is included in the comment object */}
            </div>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DisplayBlog;
