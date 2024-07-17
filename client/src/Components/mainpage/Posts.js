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
    image: null,
  });
  // const [successMessage, setSuccessMessage] = useState("");
  // const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

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
      // setSuccessMessage("Post deleted successfully");
      // setIsSuccessModalVisible(true);
      closeModal();
    } catch (error) {
      console.error("Error deleting post:", error);
      // setSuccessMessage("An error occurred while deleting the post");
      // setIsSuccessModalVisible(true);
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setFormData(selectedPost);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setImageFile(e.target.files[0]);
    }

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
   const optimisticPost = {
    ...selectedPost,
    title: formData.title,
    author: formData.author,
    price: formData.price,
    image: imageFile ? URL.createObjectURL(imageFile) : selectedPost.image, // Use local URL for new images
  };

  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.id === optimisticPost.id ? optimisticPost : post
    )
  );
  try {
    const formDataToSend = new FormData();
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

    const updatedPost = response.data;

    // Update the specific post in the posts array
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );

    // Close modal and show success message
    closeModal();
    // setSuccessMessage("Post updated successfully");
    // setIsSuccessModalVisible(true);
  } catch (error) {
    console.error("Error updating post:", error);
    // setSuccessMessage("An error occurred while updating the post");
    // setIsSuccessModalVisible(true);
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

  const showLess = () => { const optimisticPost = {
    ...selectedPost,
    title: formData.title,
    author: formData.author,
    price: formData.price,
    image: imageFile ? URL.createObjectURL(imageFile) : selectedPost.image, // Use local URL for new images
  };

  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.id === optimisticPost.id ? optimisticPost : post
    )
  );
    setShowFullDescription(false);
  };

  return (
    <>
    <div className="lg:-my-[52rem] flex ">
  <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-20 gap-x-14 mt-10 mb-5">
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
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:shadow-xl"
            onClick={() => openModal(post)}
          >
            <img
              src={post.image}
              alt="book"
              className="h-80 w-72 object-fit rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <p className="text-lg font-thin text-black truncate block capitalize">
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
              {editMode ? (
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

      {/* {isSuccessModalVisible && (
        <div
          id="successModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-60"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setIsSuccessModalVisible(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Success</span>
              </div>
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {successMessage}
              </p>
              <button
                onClick={() => setIsSuccessModalVisible(false)}
                type="button"
                className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Posts;
