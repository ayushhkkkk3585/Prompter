"use client";
import { useState, useEffect } from "react";
import React from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
    {data.map((post) => (
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => setSearchText(e.target.value);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
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

  const filteredPosts = searchText
    ? posts.filter(
        (post) =>
          post.tag?.toLowerCase().includes(searchText.toLowerCase()) ||
          post.username?.toLowerCase().includes(searchText.toLowerCase()) ||
          post.prompt?.toLowerCase().includes(searchText.toLowerCase())
      )
    : posts;

  return (
    <div className="flex justify-center flex-col items-center w-full mt-5">
      <form>
        <input
          type="text"
          placeholder="Search a tag or a user.."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="border-2 border-black/40 rounded-md px-5 py-2"
        />
      </form>

      {loading ? (
        <div className="mt-5 font-bold">Loading...</div>
      ) : (
        <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
      )}
    </div>
  );
};

export default Feed;
