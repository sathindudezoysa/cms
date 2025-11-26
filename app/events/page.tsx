import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import PostFeed from "@/components/shared/PostFeed";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Upcoming Events
        </h1>
        <PostFeed category="events" />
      </div>
      <Footer />
    </main>
  );
}
