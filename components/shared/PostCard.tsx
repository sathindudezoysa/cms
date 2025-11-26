import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/types";

export default function PostCard({
  post,
  category,
}: {
  post: Post;
  category: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Area */}
      <div className="relative h-48 w-full bg-gray-200">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
          {category}
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Date */}
        <p className="text-xs text-gray-500 mb-4">
          {new Date(post.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
          {post.content}
        </p>

        <Link
          href={`/${category}/${post.id}`} // We will need a dynamic page for single view later
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 mt-auto"
        >
          Read More &rarr;
        </Link>
      </div>
    </div>
  );
}
