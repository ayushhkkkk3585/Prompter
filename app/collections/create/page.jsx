"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateCollection() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      alert("You must be logged in to create a collection");
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
  if (!session) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Collection name is required");

    const res = await fetch("/api/collections", {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Collection created!");
      router.push("/collections");
    } else {
      alert("Failed to create collection");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
        Create a New Collection
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-black shadow-lg rounded-xl p-6 space-y-5 transition-all duration-300"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Collection Name</label>
          <input
            type="text"
            placeholder="e.g. Design Inspiration"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
          <textarea
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md"
        >
          + Create Collection
        </button>
      </form>
    </div>
  );
}
