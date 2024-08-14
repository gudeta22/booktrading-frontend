import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import backendURL from "../../api/axios";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

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
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const modalRef = useRef(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
    setIsPdfModalOpen(false);
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
      await axios.put(
        `${backendURL}${API_ENDPOINTS.UPDATE_POSTS}/${selectedPost.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const response = await axios.get(`${backendURL}${API_ENDPOINTS.VIEW_POSTS}`);
      setPosts(response.data);

      closeModal();
      setImageFile(null);
      setPdfFile(null);

    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

          <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
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
                    className="bg-white shadow-lg mx-14  rounded-lg overflow-hidden flex flex-col cursor-pointer"
                    style={{ height: '420px' , width:'320px' }}
                    onClick={() => openModal(post)}
                  >
                    <img
                      src={post.image}
                      alt="Post Thumbnail"
                      className="w-full h-72 object-fit"
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
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div
                ref={modalRef}
                className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{selectedPost.title}</h2>
                  <button onClick={closeModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4">
                  {editMode ? (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
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
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
                          Image
                        </label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="pdf">
                          PDF
                        </label>
                        <input
                          type="file"
                          name="pdf"
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={cancelEditMode}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <img
                        src={selectedPost.image}
                        alt="Post Thumbnail"
                        className="w-full h-64 object-fit rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {selectedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Author:</strong> {selectedPost.author}
                      </p>
                      <p className="text-xl font-bold text-gray-800 mb-4">
                        ${selectedPost.price}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {showFullDescription
                          ? selectedPost.content
                          : selectedPost.content.slice(0, 100) + "..."}
                        {selectedPost.content.length > 100 && (
                          <button
                            className="text-blue-500 ml-2 focus:outline-none"
                            onClick={toggleDescription}
                          >
                            {showFullDescription ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </p>

                      {/* PDF Download & View Button */}
                      {selectedPost.pdf && (
                        <div className="flex space-x-4">
                          <a
                            href={selectedPost.pdf}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500"
                          >
                            Download PDF
                          </a>
                          <button
                            onClick={openPdfModal}
                            className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500"
                          >
                            View PDF
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-gray-100 p-4 flex justify-end">
                  {!editMode && (
                    <>
                      <button
                        onClick={toggleEditMode}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(selectedPost.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* PDF Viewer Modal */}
              {isPdfModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white w-full max-w-3xl mx-4 rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold">PDF Viewer</h2>
                      <button onClick={() => setIsPdfModalOpen(false)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="p-4 h-96 overflow-y-auto">
                      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
                        <Viewer
                          fileUrl={selectedPost.pdf}
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </Worker>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Posts;
