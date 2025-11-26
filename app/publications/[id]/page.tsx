import { getPostById } from "@/lib/data";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function NewsDetailPage({ params }: PageProps) {
  // 1. Fetch the specific post
  // Note: params.id comes from the URL
  const post = await getPostById("publications", params.id);

  // 2. Handle 404 if not found
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <article className="flex-grow container mx-auto px-4 py-10 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition"
        >
          &larr; Back to News
        </Link>

        {/* Hero Image */}
        {post.imageUrl && (
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-8">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content Header */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            News
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 mt-4">
            Published on{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Main Text Content */}
        {/* whitespace-pre-wrap preserves paragraphs/newlines from the admin input */}
        <div className="prose prose-lg max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>

        {/* External Link (if exists) */}
        {post.link && (
          <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <p className="font-semibold text-blue-900 mb-2">
              Related Resource:
            </p>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {post.link}
            </a>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
