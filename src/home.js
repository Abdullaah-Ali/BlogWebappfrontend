import { useState } from 'react';

const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: "My first Website", body: "Lorem ipsum is the great", author: "Lorem", id: 1 },
    { title: "Am I capable enough?", body: "Lorem ipsum is the great", author: "Lorem", id: 2 },
    { title: "Yo Joshua", body: "Lorem ipsum is the great", author: "Lorem", id: 3 }
  ]);

  return (
    <div className="home">
      <h2>Total Blogs</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
        </div>
      ))}

    </div>
  );
}

export default Home;
