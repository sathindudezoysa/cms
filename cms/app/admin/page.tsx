"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Category, Post } from "@/lib/types";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("news");

  // 1. Real-time Data Fetching
  useEffect(() => {
    setLoading(true);
    // Subscribe to the selected collection
    const q = query(
      collection(db, selectedCategory),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedCategory]);

  // 2. Delete Handler
  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this post? This cannot be undone."
      )
    ) {
      try {
        await deleteDoc(doc(db, selectedCategory, id));
        // No need to refresh, onSnapshot handles it automatically!
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Failed to delete item.");
      }
    }
  };

  // 3. Logout Handler
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/create"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Create New
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {["news", "events", "publications"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as Category)}
            className={`px-6 py-3 font-medium capitalize transition-colors relative ${
              selectedCategory === cat
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading contents...
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No posts found in {selectedCategory}.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    {post.imageUrl && (
                      <div className="relative w-16 h-10 rounded overflow-hidden bg-gray-200">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-slate-800">
                    {post.title}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {/* Edit Link: We pass category as a query param */}
                    <Link
                      href={`/admin/edit/${post.id}?category=${selectedCategory}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
