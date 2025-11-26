import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import PostFeed from "@/components/shared/PostFeed";

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Publications</h1>
        <PostFeed category="publications" />
      </div>
      <Footer />
    </main>
  );
}
