import HeroSlider from "@/components/home/HeroSlider";
import WelcomeSection from "@/components/home/WelcomeSection";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import PostFeed from "@/components/shared/PostFeed"; // Import the new component

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroSlider />
      <WelcomeSection />

      {/* NEW: Latest News Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Latest News
        </h2>
        {/* Show only 3 items and a 'View All' button */}
        <PostFeed category="news" limit={3} showViewAll={true} />
      </section>

      {/* NEW: Upcoming Events Section (Optional) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Upcoming Events
          </h2>
          <PostFeed category="events" limit={3} showViewAll={true} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
