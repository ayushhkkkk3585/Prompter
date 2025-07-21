"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // add status here
  const [posts, setPosts] = useState([]);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // redirect to homepage or login
    }
  }, [status, router]);

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

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (status === "authenticated") {
      fetchPosts();
    }
  }, [session?.user?.id, status]);

  // Optional: Show loading while auth status is loading
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) return null; // avoid flashing UI before redirect

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Profile
          name="My"
          desc="Welcome to the profile page, here you can see all your prompts"
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Suspense>
    </>
  );
};

export default MyProfile;
