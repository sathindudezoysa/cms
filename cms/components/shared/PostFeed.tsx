import { getPosts } from "@/lib/data";
import { Category } from "@/lib/types";
import PostCard from "./PostCard";
import Link from "next/link";

interface PostFeedProps {
  category: Category;
  limit?: number; // Optional: If passed, we only show that many
  showViewAll?: boolean; // Optional: Show a "View All" button?
}

export default async function PostFeed({
  category,
  limit,
  showViewAll,
}: PostFeedProps) {
  // Fetch data on the server
  const posts = await getPosts(category, limit);

  if (posts.length === 0) {
    return <p className="text-gray-500 italic">No {category} found.</p>;
  }

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} category={category} />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-8 text-center">
          <Link
            href={`/${category}`}
            className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition font-medium"
          >
            View All {category}
          </Link>
        </div>
      )}
    </section>
  );
}
