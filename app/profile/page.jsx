"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const confirmed = confirm("Are you sure u want to delete this prompt?");
    if (confirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts=posts.filter((p)=>p._id !==post._id);
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  return (
    <>
      <Profile
        name="My"
        desc="Welcome to the profile page, here you can see all your prompts"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        class
      />
    </>
  );
};

export default MyProfile;
