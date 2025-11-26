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

// Extend the category type locally to include 'messages'
type AdminTab = Category | "messages";

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<AdminTab>("news");

  useEffect(() => {
    setLoading(true);
    // Fetch from the selected collection (messages, news, events, or publications)
    const q = query(collection(db, selectedTab), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedTab]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, selectedTab, id));
      } catch (error) {
        alert("Failed to delete item.");
      }
    }
  };

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
          {/* Only show Create button if NOT in messages tab */}
          {selectedTab !== "messages" && (
            <Link
              href="/admin/create"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              + Create New
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {["news", "events", "publications", "messages"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab as AdminTab)}
            className={`px-6 py-3 font-medium capitalize transition-colors whitespace-nowrap ${
              selectedTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "messages" ? "📩 Inbox" : tab}
          </button>
        ))}
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No items found in {selectedTab}.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                {selectedTab === "messages" ? (
                  // Specific Headers for Messages
                  <>
                    <th className="p-4">Date</th>
                    <th className="p-4">From</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Message</th>
                    <th className="p-4 text-right">Action</th>
                  </>
                ) : (
                  // Standard Headers for Posts
                  <>
                    <th className="p-4">Image</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition align-top"
                >
                  {selectedTab === "messages" ? (
                    // --- RENDER MESSAGE ROW ---
                    <>
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                        <div className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800">
                          {item.firstName} {item.lastName}
                        </div>
                        <div className="text-xs text-blue-600">
                          {item.email}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-slate-700">
                        {item.subject}
                      </td>
                      <td className="p-4 text-sm text-gray-600 max-w-md">
                        {item.message}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold border border-red-200 px-3 py-1 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  ) : (
                    // --- RENDER POST ROW ---
                    <>
                      <td className="p-4">
                        {item.imageUrl && (
                          <div className="relative w-16 h-10 rounded overflow-hidden bg-gray-200">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-medium text-slate-800">
                        {item.title}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          href={`/admin/edit/${item.id}?category=${selectedTab}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold ml-4"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
