import React, { useState } from "react";
import axios from "axios";

const backendURL = "http://localhost:4005";
const API_ENDPOINTS = {
  CREATE_POST: "/api/posts/create",
};

function Createposts() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    image: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

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
      });

      setSuccessMessage("Post submitted successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="lg:-my-[60rem]">
      <div className="">
        <div className="items-center justify-center my-16 border object-fit w-[50%] mx-[31rem] p-8 shadow-xl object-fit ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[30rem] h-64 border-2 lg:mx-[13rem] border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
          >
            
            <input
              type="file"
              id="dropzone-file"
              // style={{ display: "none" }} // Inline style to hide the input
              onChange={handleFileChange}
            />

            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Thumbnail"
                className="w-full h-full object-contain"
              />
            )}
          </label>
          <form className="font-[sans-serif] max-w-4xl md:mx-[13rem] my-14">
            <div className="grid sm:grid-cols-1 gap-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Title"
                  className="px-4 py-3 bg-[#f0f1f2] text-black w-[40rem] text-sm border outline-[#007bff] rounded"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Author"
                  className="px-4 py-3 bg-[#f0f1f2] text-black w-[40rem] text-sm border outline-[#007bff] rounded"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="Price"
                  className="px-4 py-3 bg-[#f0f1f2] text-black w-[40rem] text-sm border outline-[#007bff] rounded"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-8 px-6 py-2.5 text-sm w-[10rem] font-semibold bg-[#007bff] text-white rounded hover:bg-[#006bff]"
            >
              Submit
            </button>
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Createposts;
