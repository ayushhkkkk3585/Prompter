"use client";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import PromptCard from "./PromptCard";
import Link from "next/link";

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {data.map((post, index) => (
      <div
        key={post._id}
        className="transform transition-all duration-300 hover:-translate-y-1"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <PromptCard post={post} handleTagClick={handleTagClick} />
      </div>
    ))}
  </div>
);

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 8;

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(0);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setCurrentPage(0);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt",{
           cache: "no-store",
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search
  const filteredPosts = searchText
    ? posts.filter(
        (post) =>
          post.tag?.toLowerCase().includes(searchText.toLowerCase()) ||
          post.username?.toLowerCase().includes(searchText.toLowerCase()) ||
          post.prompt?.toLowerCase().includes(searchText.toLowerCase())
      )
    : posts;

  // Calculate posts for current page
  const offset = currentPage * postsPerPage;
  const currentPageData = filteredPosts.slice(offset, offset + postsPerPage);
  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle page click event from react-paginate
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        {/* <div className="flex items-center justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl">
            <svg 
              className="w-10 h-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-transparent">
          Discover Prompts
        </h1> */}
        
        {/* <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          Explore a curated collection of AI prompts created by our community. Find inspiration for your next project.
        </p> */}

        {/* Search and Action Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search prompts, tags, or users..."
                value={searchText}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              />
              {searchText && (
                <button
                  onClick={() => {
                    setSearchText("");
                    setCurrentPage(0);
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <svg 
                    className="h-5 w-5 text-gray-400 hover:text-gray-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Create Post Button */}
            <Link href="/create-prompt" className="lg:flex-shrink-0">
              <button className="w-full lg:w-auto inline-flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50">
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                  />
                </svg>
                Create Prompt
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats/Filters Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-white border border-blue-200 rounded-lg px-4 py-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-700">
                {loading ? "Loading..." : `${filteredPosts.length} Prompts`}
              </span>
            </div>
          </div>
          
          {searchText && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-4 h-4 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" 
                  />
                </svg>
                <span className="text-sm text-blue-700 font-medium">
                  Filtered: "{searchText}"
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 10h16M4 14h16M4 18h16" 
            />
          </svg>
          <span>Grid View</span>
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing prompts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <svg 
                className="w-10 h-10 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {searchText ? "No matching prompts found" : "No prompts available"}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchText 
              ? `Try adjusting your search terms or browse all prompts.`
              : "Be the first to share a prompt with the community!"
            }
          </p>
          {searchText ? (
            <button
              onClick={() => {
                setSearchText("");
                setCurrentPage(0);
              }}
              className="inline-flex items-center border-2 border-blue-500 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
              Clear Search
            </button>
          ) : (
            <Link href="/create-prompt">
              <button className="inline-flex items-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl">
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                  />
                </svg>
                Create First Prompt
              </button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <PromptCardList
            data={currentPageData}
            handleTagClick={handleTagClick}
          />

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center mt-12">
              <ReactPaginate
                previousLabel={
                  <div className="flex items-center space-x-2 h-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {/* <span>Prev</span> */}
                  </div>
                }
                nextLabel={
                  <div className="flex items-center space-x-2 h-6">
                    {/* <span>Next</span> */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                }
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"flex items-center gap-2 select-none"}
                pageClassName={
                  "border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium"
                }
                activeClassName={"bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700"}
                previousClassName={
                  "border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium"
                }
                nextClassName={
                  "border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium"
                }
                disabledClassName={"opacity-50 cursor-not-allowed hover:bg-white hover:border-gray-300"}
                forcePage={currentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;