"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Category } from "@/lib/types";
import ImageUpload from "@/components/ui/ImageUpload"; // Import our new component

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("news");
  const [imageUrl, setImageUrl] = useState(""); // Just a string now!
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);

    try {
      // Direct save to Firestore.
      // No "storage" logic needed here because Cloudinary already handled it.
      await addDoc(collection(db, category), {
        title,
        content,
        category,
        imageUrl, // Saving the Cloudinary URL
        createdAt: Date.now(),
      });

      alert("Post created successfully!");
      router.push("/admin"); // Go back to dashboard
      router.refresh(); // Refresh server components
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Create Content</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Image Upload Section */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Cover Image
          </label>
          {/* We pass the state setter directly to our component */}
          <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} />
        </div>

        {/* 2. Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="news">News</option>
              <option value="events">Event</option>
              <option value="publications">Publication</option>
            </select>
          </div>
        </div>

        {/* 3. Content Area */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Content
          </label>
          <textarea
            required
            rows={6}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 4. Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
