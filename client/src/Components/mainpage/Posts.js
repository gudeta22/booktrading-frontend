import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "react-feather";
import backendURL from "../../api/axios";

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
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(backendURL + API_ENDPOINTS.VIEW_POSTS);
        console.log("Fetched Posts:", response.data); // Debug: Check if 'description' is present
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${backendURL}${API_ENDPOINTS.DELETE_POSTS}/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
      closeModal();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

 const openModal = (post) => {
  console.log("Selected Post:", post); // Check if description is present
  setSelectedPost(post);
  setFormData({
    title: post.title,
    author: post.author,
    price: post.price,
    description: post.description || "",
    image: post.image,
  });
  setEditMode(false);
  setShowFullDescription(false); // Reset description state
};

  const closeModal = () => {
    setSelectedPost(null);
    setEditMode(false);
    setShowFullDescription(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setImageFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (imageFile) formDataToSend.append("image", imageFile);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);

    try {
      const response = await axios.put(
        `${backendURL}${API_ENDPOINTS.UPDATE_POSTS}/${selectedPost.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      closeModal();
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-none p-4">
        <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
        {/* Add your sidebar items here */}
      </aside>

      {/* Main content */}
      <div className="flex-1 p-2 bg-gray-100">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 my-20">
          {posts.length === 0
            ? Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="w-full h-80 bg-gray-300 animate-pulse rounded-lg"
                ></div>
              ))
            : posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col cursor-pointer"
                  style={{ height: '420px' }}
                  onClick={() => openModal(post)}
                >
                  <img
                    src={post.image || "default-image-url"} // Fallback to default image if not available
                    alt="Post Thumbnail"
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-5 px-10 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{post.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{post.author}</p>
                    <p className="text-xl font-bold text-gray-800 mt-2">${post.price}</p>
                    <p className="text-gray-700 mt-2">
                      {post.description ? (
                        showFullDescription || post.description.length <= 100 ? (
                          post.description
                        ) : (
                          <>
                            {post.description.slice(0, 100)}...
                            <button
                              onClick={toggleDescription}
                              className="text-blue-500 hover:underline ml-1"
                            >
                              See more
                            </button>
                          </>
                        )
                      ) : (
                        "No description available"
                      )}
                    </p>
                  </div>
                </div>
              ))}
        </section>

        {selectedPost && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg overflow-hidden h-[40rem]">
              {/* Modal Header */}
              <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Post Details</h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-400"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Title"
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="author">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        placeholder="Author"
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        placeholder="Price"
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        placeholder="Description"
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <img
                      src={selectedPost.image || "default-image-url"}
                      alt="Post Thumbnail"
                      className="w-full h-72 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mt-4">{selectedPost.title}</h3>
                    <p className="text-sm text-gray-600">{selectedPost.author}</p>
                    <p className="text-xl font-bold text-gray-800 mt-2">${selectedPost.price}</p>
                    <div className="text-gray-700 mt-2">
                      {selectedPost.description ? (
                        <>
                          {showFullDescription || selectedPost.description.length <= 200 ? (
                            <p>{selectedPost.description}</p>
                          ) : (
                            <p>
                              {selectedPost.description.substring(0, 200)}
                              <button
                                onClick={toggleDescription}
                                className="text-blue-500 hover:underline ml-1"
                              >
                                ...See more
                              </button>
                            </p>
                          )}
                          {showFullDescription && (
                            <p>
                              {selectedPost.description}
                              <button
                                onClick={showLess}
                                className="text-blue-500 hover:underline ml-1"
                              >
                                Show less
                              </button>
                            </p>
                          )}
                        </>
                      ) : (
                        <p>No description available</p>
                      )}
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={toggleEditMode}
                        className="text-blue-500 hover:underline mr-4"
                      >
                        <Edit className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(selectedPost.id)}
                        className="text-red-500 hover:underline"
                      >
                        <Trash2 className="inline mr-1" /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
