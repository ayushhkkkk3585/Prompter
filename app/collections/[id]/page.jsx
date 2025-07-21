"use client";
import { useEffect, useState } from "react";
import PromptCard from "@/components/PromptCard";

export default function CollectionDetailPage({ params }) {
  const { id } = params;
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/collections/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCollection(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Loading collection...</div>;
  if (!collection) return <div className="p-8">Collection not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{collection.name}</h1>
      {collection.description && (
        <p className="mb-6 text-gray-700">{collection.description}</p>
      )}

      {collection.prompts.length === 0 ? (
        <p>No prompts in this collection yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.prompts.map((prompt) => (
            <PromptCard key={prompt._id} post={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
