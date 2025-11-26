import { getPostById } from "@/lib/data";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// 1. Define params as a Promise (Next.js 15+ Requirement)
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  // 2. Await the params to get the actual ID string from the URL
  // If URL is /news/abc-123, then id will be "abc-123"
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // 3. Fetch data using that URL ID
  const post = await getPostById("events", id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <article className="flex-grow container mx-auto px-4 py-10 max-w-4xl">
        <Link
          href="/events"
          className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition"
        >
          &larr; Back to Events
        </Link>

        {post.imageUrl && (
          <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-8 bg-gray-100">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1600}
              height={900}
              style={{ width: "100%", height: "auto" }}
              className="object-contain"
              priority
            />
          </div>
        )}

        <div className="mb-8 border-b border-gray-200 pb-8">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Event
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 mt-4">
            Published on {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>

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
