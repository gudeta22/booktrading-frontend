import React, { useState } from "react";
import axios from "axios";
import backendURL from "../../api/axios";

const API_ENDPOINTS = {
  CREATE_POST: "/api/posts/create",
};

function CreatePosts() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    image: null,
    content: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("content", formData.content);

      await axios.post(backendURL + API_ENDPOINTS.CREATE_POST, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        title: "",
        author: "",
        price: "",
        image: null,
        content: "",
      });

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-50 to-blue-50 p-10">
      {success && (
        <div className="fixed top-10 right-5 z-50 p-4 mb-4 text-sm text-white bg-green-500 border border-green-300 rounded-lg shadow-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="font-medium">Post created successfully!</span>
          </div>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-lg p-10 my-14 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create a New Post
        </h2>
        <div className="flex justify-center mb-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <input
              type="file"
              id="dropzone-file"
              onChange={handleFileChange}
              className="hidden"
            />
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="w-full h-full object-contain rounded-md"
              />
            ) : (
              <div className="text-gray-500 text-center">
                <p className="mb-2 text-sm">Drag & drop an image here</p>
                <p className="text-xs">or click to select an image</p>
              </div>
            )}
          </label>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Author"
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        <button
  type="button"
  onClick={handleSubmit}
  className="w-full py-3 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white font-semibold rounded-md shadow-md hover:bg-gradient-to-r hover:indigo-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Submit
</button>

        </form>
      </div>
    </div>
  );
}

export default CreatePosts;
