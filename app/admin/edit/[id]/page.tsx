"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ImageUpload from "@/components/ui/ImageUpload";

export default function EditPost() {
  const router = useRouter();
  const params = useParams(); // Get ID from URL
  const searchParams = useSearchParams(); // Get Category from ?category=...

  const id = params.id as string;
  const category = searchParams.get("category") as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchData = async () => {
      if (!id || !category) return;

      try {
        const docRef = doc(db, category, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setContent(data.content);
          setImageUrl(data.imageUrl);
        } else {
          alert("Post not found");
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error fetching doc:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, category, router]);

  // 2. Handle Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const docRef = doc(db, category, id);
      await updateDoc(docRef, {
        title,
        content,
        imageUrl,
        updatedAt: Date.now(),
      });

      alert("Post updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading post details...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Edit {category}</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Cover Image
          </label>
          <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Content
          </label>
          <textarea
            required
            rows={8}
            className="w-full p-3 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
