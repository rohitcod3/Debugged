"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { databases } from "@/models/client/config";
import { db, questionCollection } from "@/models/name";
import { useAuthStore } from "@/store/Auth";

const AskQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setError("");

    try {
      // Create the question document directly using the Appwrite client SDK
      const response = await databases.createDocument(
        db,
        questionCollection,
        "unique()", // let Appwrite generate a unique ID
        {
          title,
          content,
          authorId: user?.$id, // using the current user's ID from your auth store
          tags: [],          // add tag logic if needed
          attachmentId: null // set if you support file attachments
        }
      );

      // Redirect to the newly created question's page.
      // Here we encode the title for a URL-friendly version.
      router.push(`/questions/${response.$id}/${encodeURIComponent(title)}`);
    } catch (err: any) {
      console.error("Error creating question:", err);
      setError(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Ask a Question</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter your question title"
            className="mt-1 block w-full rounded-md border-gray-300 text-black p-2 shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            placeholder="Describe your question in detail"
            className="mt-1 text-black block w-full rounded-md border-gray-300 p-2 shadow-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestionPage;
