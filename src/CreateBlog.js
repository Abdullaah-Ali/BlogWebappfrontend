import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const CreateBlog = () => {
  const [content, setContent] = useState(''); // State to hold the content of the editor
  const [description, setDescription] = useState(''); // State to hold the description input
  const [message, setMessage] = useState(''); // State to hold the message
  const [ author , Setauthor] = useState(''); // State to hold the author
  const handleEditorChange = (content, editor) => {
    setContent(content); // Update the content state with the new editor content
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Update the description state with the input value
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear() % 100}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/createblog', { author,formattedDate, content, description , }, {
        withCredentials: true, // Send cookies with the request if needed
        headers: {
          'Content-Type': 'application/json' // Set the content type
        }
      });

      console.log(response.data); // Handle the response from the backend as needed
      setMessage('Blog posted successfully');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        setMessage('Please login to add a blog');
      } else {
        setMessage('An error occurred while posting the blog');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        /> {/* Add a description input field */}
        <Editor
          apiKey='clgudk65yvntvkprsjkpsfe88vytzlx8tykjgy6sca3bfnsx'
          init={{
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("Soon")),
          }}
          initialValue="Syed Abdullah Ali"
          onEditorChange={handleEditorChange} // Callback to handle editor content changes
        />
        <button type="submit">Submit</button> {/* Add a submit button */}
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </div>
  );
};

export default CreateBlog;
