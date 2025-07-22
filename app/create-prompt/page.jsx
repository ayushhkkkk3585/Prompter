"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Failed to create prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
