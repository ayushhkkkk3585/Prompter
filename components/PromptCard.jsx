"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
// import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
// import {useRouter} from "next/navigation"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  // const router = useRouter();
  console.log(post);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="break-inside-avoid rounded-xl border border-gray-300 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-5 sm:p-6 w-full">
      <div className="flex justify-between items-start gap-4 sm:gap-6">
        {/* User Information */}
        <div className="flex flex-1 items-center gap-3 sm:gap-4">
          <div className="relative">
            <Image
              src={post?.creator?.image}
              width={50}
              height={50}
              className="rounded-full object-cover ring-2 ring-gray-200 hover:ring-gray-300 transition-all"
              alt={`${post?.creator?.username}'s profile`}
            />

            {/* <Link href="/profile">
              <Image
                src={post.creator.image}
                width={50}
                height={50}
                className="rounded-full object-cover ring-2 ring-gray-200 hover:ring-gray-300 transition-all"
                alt={`${post.creator.username}'s profile`}
              />
            </Link> */}
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-satoshi font-semibold text-gray-900 text-sm sm:text-lg truncate">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-xs sm:text-sm text-gray-500 truncate">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <div
          className="copy_btn w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-200 flex justify-center items-center cursor-pointer transition-colors duration-200 flex-shrink-0"
          onClick={handleCopy}
        >
          <Image
            src={copied === post.prompt ? "/check.svg" : "/copy.png"}
            alt="copy button"
            width={16}
            height={16}
            className="opacity-70"
          />
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-5 space-y-3">
        <p className="font-satoshi text-sm sm:text-base text-gray-700 leading-relaxed break-words">
          {post.prompt}
        </p>
        <p
          className="font-inter text-xs sm:text-sm text-blue-500 cursor-pointer inline-block hover:opacity-80 transition-opacity"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
        {session?.user.id === post.creator?._id && pathName === "/profile" && (
          <div className="flex justify-center items-center gap-4">
            <p
              className="text-sm font-bold text-green-400 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="text-sm font-bold text-orange-400 cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
