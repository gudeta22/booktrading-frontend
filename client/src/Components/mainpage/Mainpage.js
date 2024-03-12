import React, { useState, useEffect } from "react";
import axios from "axios";
import Landingpage from "./Landingpage";
const backendURL = "http://localhost:4004";
const API_ENDPOINTS = {
  VIEW_POSTS: "/api/posts/", // Update this with your actual endpoint
};
function Mainpage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  //useffect
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(backendURL + API_ENDPOINTS.VIEW_POSTS);
        setPosts(response.data);
         setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);
  return (
    <>
      <Landingpage />
      <div>
        <section
          id="projects"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {/* Conditional rendering based on loading state */}
          {loading ? ( // Render shimmer effect while loading
            <div className="w-72 h-80 bg-gray-200 animate-pulse rounded-xl"></div>
          ) : (posts.map((post) => (
              <div
                key={post.id}
                className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
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
                    <div className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-bag-plus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )))}
        </section>
      </div>
    </>
  );
}

export default Mainpage;
