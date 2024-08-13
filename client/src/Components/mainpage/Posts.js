import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "react-feather";
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
  const [pdfFile, setPdfFile] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    content: "",
    image: null,
    pdf: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backendURL}${API_ENDPOINTS.VIEW_POSTS}`);
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
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      closeModal();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      author: post.author,
      price: post.price,
      content: post.content || "",
      image: post.image,
      pdf: post.pdf || null,
    });
    setEditMode(false);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setEditMode(false);
    setShowFullDescription(false);
  };

  const toggleEditMode = () => {
    setEditMode(true);
  };

  const cancelEditMode = () => {
    setFormData({
      title: selectedPost.title,
      author: selectedPost.author,
      price: selectedPost.price,
      content: selectedPost.content || "",
      image: selectedPost.image,
      pdf: selectedPost.pdf || null,
    });
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setImageFile(e.target.files[0]);
    } else if (name === "pdf") {
      setPdfFile(e.target.files[0]);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (imageFile) formDataToSend.append("image", imageFile);
    if (pdfFile) formDataToSend.append("pdf", pdfFile);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("content", formData.content || "");

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
    setShowFullDescription((prev) => !prev);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-800 text-white flex-none p-4">
          <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
        </aside>

        <div className="flex-1 p-6 bg-gray-100">
          <div className="fixed w-[18rem] top-0 left-0 right-0 -mx-5 p-5 z-10 shadow-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M16.65 10.65A6.5 6.5 0 1110.65 4.65 6.5 6.5 0 0116.65 10.65z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.length === 0
              ? Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="w-full h-80 bg-gray-300 animate-pulse rounded-lg"
                  ></div>
                ))
              : filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col cursor-pointer"
                    style={{ height: '420px' }}
                    onClick={() => openModal(post)}
                  >
                    <img
                      src={post.image}
                      alt="Post Thumbnail"
                      className="w-full h-72 object-cover"
                    />
                    <div className="p-5 px-10 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{post.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{post.author}</p>
                      <p className="text-xl font-bold text-gray-800 mt-2">${post.price}</p>
                    </div>
                  </div>
                ))}
          </section>

          {selectedPost && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
              <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Post Details</h2>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gray-400"
                  >
                    &times;
                  </button>
                </div>

                <div className="p-6 h-auto">
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
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="pdf">
                          PDF
                        </label>
                        <input
                          type="file"
                          name="pdf"
                          accept=".pdf"
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
                          type="text"
                          name="price"
                          value={formData.price}
                          placeholder="Price"
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="content">
                          Content
                        </label>
                        <textarea
                          name="content"
                          value={formData.content}
                          placeholder="Content"
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                      <div className="flex items-center justify-end space-x-2 -mt-2">
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditMode}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <img
                        src={selectedPost.image}
                        alt="Post Thumbnail"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedPost.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{selectedPost.author}</p>
                      <p className="text-xl font-bold text-gray-800 mb-4">${selectedPost.price}</p>
                      <p className="text-gray-700">{showFullDescription ? selectedPost.content : `${selectedPost.content.slice(0, 100)}...`}</p>
                      <button
                        onClick={toggleDescription}
                        className="text-blue-500 hover:underline"
                      >
                        {showFullDescription ? "Show Less" : "Show More"}
                      </button>
                      {selectedPost && (
  <div>
    {selectedPost.pdf ? (
      <a
        href={`${backendURL}/${selectedPost.pdf}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        View PDF
      </a>
    ) : (
      <p>No PDF available</p>
    )}
  </div>
)}

                      <div className="mt-6 flex items-end justify-end space-x-2">
                        <button
                          onClick={toggleEditMode}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(selectedPost.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Posts;
