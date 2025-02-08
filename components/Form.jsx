import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  // Ensure post object has default values
  const safePost = {
    prompt: "",
    tag: "",
    ...post, // This will override defaults if post has values
  };

  return (
    <form onSubmit={handleSubmit} className="m-2">
      <div className="w-full md:max-w-2xl mx-auto px-4 py-8 rounded-lg shadow-2xl border-black border-[1px] bg-white">
        <div className="text flex flex-col justify-center w-full items-center space-y-6">
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
            {type} Post
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            {type} and Share amazing AI prompts
          </p>
          <label className="w-full space-y-2">
            <span className="block text-sm font-medium text-gray-700">
              Your AI prompt
            </span>
            <textarea
              value={safePost.prompt}
              onChange={(e) => {
                setPost({ ...safePost, prompt: e.target.value });
              }}
              placeholder="Write your Prompt here..."
              required
              className="w-full min-h-[200px] p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 resize-none text-gray-800 placeholder-gray-400"
            />
          </label>
          <label className="w-full space-y-2">
            <span className="block text-sm font-medium text-gray-700">
              Tag <span className="font-normal">(#dev, #marketing, etc)</span>
            </span>
            <input
              value={safePost.tag}
              onChange={(e) => {
                setPost({ ...safePost, tag: e.target.value });
              }}
              placeholder="Mention Your tags here..."
              required
              className="w-full p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 resize-none text-gray-800 placeholder-gray-400"
            />
          </label>
          <div className="flex items-center justify-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-orange-500 rounded-full text-white"
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
