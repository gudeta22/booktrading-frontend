import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "react-feather";

const backendURL = "http://localhost:4009";
const API_ENDPOINTS = {
  VIEW_POSTS: "/api/posts/",
  DELETE_POSTS: "/api/posts/delete",
};

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(backendURL + API_ENDPOINTS.VIEW_POSTS);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
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
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div className="lg:-my-[52rem]">
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
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
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {post.title}
                    </p>
                    <p className="text-lg font-bold text-black truncate block capitalize">
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
        <div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 z-50 rounded-lg shadow-lg modal-content w-[25%] h-[75%]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <h2 className="text-xl font-bold text-gray-800">{selectedPost.title}</h2>
            <p className="text-gray-600">{selectedPost.author}</p>
            <img
              src={selectedPost.image}
              alt="book"
              className="mt-4 h-80 w-full object-fit rounded-lg"
            />
            <p className="mt-4 text-gray-800">${selectedPost.price}</p>
            
            {/* Description space */}
            {/* <p className="mt-4 text-gray-800">{selectedPost.description}</p> */}
             <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>

            {/* Render delete button only if a post is selected */}
            <div className="flex justify-end mt-4">
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
