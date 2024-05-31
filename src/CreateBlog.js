import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const CreateBlog = () => {
  const [content, setContent] = useState(""); // State to hold the content of the editor

  const handleEditorChange = (content, editor) => {
    setContent(content); // Update the content state with the new editor content
  };


  const currentDate = new Date();
 // Assuming currentDate is the current date object

// Format the date
const formattedDate = `${currentDate.getFullYear() % 100}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the title and content to your backend API
      const response = await axios.post('http://localhost:5000/createblog', {formattedDate ,  content }, {
        withCredentials: true, // Send cookies with the request if needed
        headers: {
          'Content-Type': 'application/json' // Set the content type
        }
      });

      console.log(response.data); // Handle the response from the backend as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
       
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
    </div>
  );
};

export default CreateBlog;
