import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "react-feather";

const backendURL = "http://localhost:4000";
const API_ENDPOINTS = {
  VIEW_POSTS: "/api/posts/",
  DELETE_POSTS: "/api/posts/delete",
  UPDATE_POSTS: "/api/posts/update",
};

function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [editMode, setEditMode] = useState(false); // New state to toggle edit mode
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(backendURL + API_ENDPOINTS.VIEW_POSTS);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${backendURL}${API_ENDPOINTS.DELETE_POSTS}/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
      console.log("Post deleted successfully");
      closeModal(); // Close modal after deleting post
    } catch (error) {
      console.error("Error deleting post:", error);
      console.log("An error occurred while deleting the post");
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setEditMode(false); // Reset edit mode when closing modal
  };

  const toggleEditMode = () => {
    setEditMode(!editMode); // Toggle edit mode when clicking on Edit icon
    setFormData(selectedPost); // Set form data to current post data
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setImageFile(e.target.files[0]); // Set the image file
    }

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData(); // Use a different variable name here
      formDataToSend.append("image", imageFile);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("price", formData.price);
      const response = await axios.put(
        `${backendURL}${API_ENDPOINTS.UPDATE_POSTS}/${selectedPost.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedPost = response.data; // Get the updated post data from the response

      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id ? updatedPost : post
      );

      setPosts(updatedPosts);
      setSelectedPost(updatedPost);
      closeModal();
      window.location.reload();
      console.log("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const showLess = () => {
    setShowFullDescription(false);
  };

  return (
    <>
      <div className="lg:-my-[52rem] flex ">
        <section className="w-fit mx-auto grid grid-cols-1  lg:grid-cols-4 md:grid-cols-2 gap-y-20 gap-x-14 mt-10 mb-5">
          {posts.length === 0
            ? Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="w-72 h-80 bg-gray-200 animate-pulse rounded-xl"
                ></div>
              ))
            : posts.map((post) => (
                <div
                  key={post.id}
                  className="w-72 bg-white shadow-md rounded-xl duration-5005 hover:shadow-xl"
                  onClick={() => openModal(post)}
                >
                  <img
                    src={post.image}
                    alt="book"
                    name="image"
                    type="file"
                    className="h-80 w-72 object-fit rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-72">
                    <p className="text-lg  font-thin text-black truncate block capitalize">
                      {post.title}
                    </p>
                    <p className="text-lg font-thin text-black truncate block capitalize">
                      {post.author}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        ${post.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </section>
      </div>

      {selectedPost && (
        <div className="relative">
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-white p-8 z-50 rounded-lg shadow-lg modal-content w-[26%] h-[75%] overflow-y-auto">
              {editMode ? ( // Render edit form if edit mode is enabled
                <>
                  <form onSubmit={handleSubmit} className="">
                    <input
                      type="file"
                      name="image"
                      id="dropzone-file"
                      onChange={handleInputChange}
                      className="flex flex-col items-center justify-center w-[20rem] h-52 border-2 lg:mx-14 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
                    />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      placeholder="Title"
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-[#f0f1f2] my-5 mx-14 text-black w-[20rem] text-sm border outline-[#007bff] rounded"
                    />
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      placeholder="Author"
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-[#f0f1f2] my-5 mx-14 text-black w-[20rem] text-sm border outline-[#007bff] rounded"
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-[#f0f1f2] my-5 mx-14 text-black w-[20rem] text-sm border outline-[#007bff] rounded"
                    />

                    <button
                      type="submit"
                      className="bg-blue-700 m-5 text-white hover:bg-blue-800 w-24 p-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="bg-red-700 text-white hover:bg-red-800 w-24 p-2"
                    >
                      Cancel
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <img
                    src={selectedPost.image}
                    alt="book"
                    className="mt-4 h-80 w-full object-fit rounded-lg"
                  />
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedPost.title}
                  </h2>
                  <p className="text-gray-600">{selectedPost.author}</p>
                  <p className="mt-4 text-gray-800">${selectedPost.price}</p>
                  <div className="mt-4 text-gray-800">
                    {selectedPost.content && (
                      <>
                        {showFullDescription ||
                        selectedPost.content.length <= 200 ? (
                          selectedPost.content
                        ) : (
                          <>
                            {selectedPost.content.substring(0, 200)}
                            <button
                              onClick={toggleDescription}
                              className="text-blue-500 hover:underline focus:outline-none"
                            >
                              ...See more
                            </button>
                          </>
                        )}
                        {showFullDescription && (
                          <button
                            onClick={showLess}
                            className="text-blue-500 hover:underline focus:outline-none"
                          >
                            Show less
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-end mt-4">
                <Edit
                  onClick={toggleEditMode}
                  className="text-blue-600 font-bold cursor-pointer mr-4"
                />
                <Trash2
                  onClick={() => handleDeletePost(selectedPost.id)}
                  className="text-red-600 font-bold cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;
