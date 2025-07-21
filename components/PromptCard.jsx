"use client";

import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then(setCollections);
  }, []);

  const addToCollection = async () => {
    if (!session) {
      alert("Please log in to add prompts to collections.");
      return;
    }
    if (!selectedCollection) {
      alert("Please select a collection");
      return;
    }
    try {
      const res = await fetch(`/api/collections/${selectedCollection}`, {
        method: "PUT",
        body: JSON.stringify({ action: "add", promptId: post._id }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) alert("Added to collection!");
      else alert("Failed to add");
    } catch {
      alert("Error adding to collection");
    }
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="break-inside-avoid rounded-xl border border-gray-300 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 lg:p-6 w-full h-[350px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start gap-3 sm:gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Image
            src={post?.creator?.image || "/default-avatar.png"}
            width={40}
            height={40}
            className="rounded-full object-cover ring-2 ring-gray-200 hover:ring-gray-300 transition-all sm:w-12 sm:h-12"
            alt={`${post?.creator?.username}'s profile`}
          />
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="font-satoshi font-semibold text-gray-900 text-sm sm:text-base truncate">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-xs sm:text-sm text-gray-500 truncate">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <button
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-50 hover:bg-gray-200 flex justify-center items-center transition"
          onClick={handleCopy}
          aria-label="Copy prompt"
        >
          <Image
            src={copied === post.prompt ? "/check.svg" : "/copy.png"}
            alt="copy"
            width={14}
            height={14}
            className="opacity-70 sm:w-4 sm:h-4"
          />
        </button>
      </div>

      {/* Prompt & Tag */}
      <div className="mt-3 sm:mt-4 flex-1 flex flex-col overflow-hidden">
        <div className="overflow-y-auto pr-1 mb-2 scrollbar-thin scrollbar-thumb-gray-300">
          <p className="font-satoshi text-sm sm:text-base text-gray-700 leading-relaxed break-words whitespace-pre-wrap hyphens-auto">
            {post.prompt}
          </p>
        </div>

        <p
          className="font-inter text-xs sm:text-sm text-blue-500 cursor-pointer hover:text-blue-600 transition"
          onClick={() => handleTagClick?.(post.tag)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleTagClick?.(post.tag);
          }}
        >
          {post.tag}
        </p>
      </div>

      {/* Add to Collection */}
      {session && (
        <div className="pt-2 border-t border-gray-100 mt-2">
          <div className="flex flex-col gap-2 sm:gap-3">
            <label className="text-sm font-medium text-gray-700">
              Add to Collection:
            </label>
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled className="text-gray-400">
                  Select collection
                </option>
                {collections.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                    className="text-gray-800 bg-white hover:bg-blue-50" // optional, for custom dropdown styles
                  >
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                onClick={addToCollection}
                disabled={!selectedCollection}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium from-blue-600 to-cyan-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed sm:flex-shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Delete for Author */}
      {session?.user.id === post.creator?._id && pathName === "/profile" && (
        <div className="pt-3 border-t border-gray-100 mt-5">
          <div className="flex justify-center gap-6">
            <button
              className="text-sm font-semibold text-green-600 hover:text-green-700 hover:underline transition"
              onClick={handleEdit}
              type="button"
            >
              Edit
            </button>
            <button
              className="text-sm font-semibold text-red-600 hover:text-red-700 hover:underline transition"
              onClick={handleDelete}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
