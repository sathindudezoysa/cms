// src/app/page.tsx
import HeroSlider from "@/components/home/HeroSlider";
import QuickLinksBar from "@/components/home/QuickLinksBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import ContentFeedItem from "@/components/home/ContentFeedItem";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";

// Data extracted from the screenshot for demo purposes
const feedData = [
  {
    title:
      "The 10th AFLAS Congress & The 18th Academic Conference on Laboratory Animal Science and Technology of China",
    meta: "News | September 2024",
    description: [
      "The 10th AFLAS Congress was successfully held, bringing together experts from across Asia to discuss advancements in laboratory animal science.",
    ],
    // Using a placeholder that looks like a blue conference banner
    images: [
      "https://placehold.co/1200x600/0056b3/ffffff?text=10th+AFLAS+Congress+Banner",
    ],
  },
  {
    title: "13th Scientific Sessions & International Conference of SLALA",
    meta: "Events | Upcoming: January 2026",
    description: [
      "Theme: 'Ethics, Collaboration & Representative - Shaping the Future of Animal Research'. Held at the University of Colombo. Call for abstracts is now open.",
    ],
    // Using a placeholder that looks like the green poster
    images: [
      "https://placehold.co/800x1000/065f46/ffffff?text=13th+Scientific+Sessions+Poster+2026",
    ],
  },
  {
    title: "Asia Laboratory Animal Day 2021",
    meta: "News | 2021 Archive",
    description: [
      "SLALAS celebrated Asia Laboratory Animal Day with a tree planting ceremony at the Faculty of Medicine, University of Colombo, emphasizing environmental responsibility alongside scientific progress.",
    ],
    // Grid of 4 images
    images: [
      "https://placehold.co/600x400/e5e7eb/6b7280?text=Plaque+Unveiling",
      "https://placehold.co/600x400/e5e7eb/6b7280?text=Tree+Planting+1",
      "https://placehold.co/600x400/e5e7eb/6b7280?text=Group+Photo+Outside",
      "https://placehold.co/600x400/e5e7eb/6b7280?text=Indoor+Session",
    ],
  },
  {
    title: "AFLAS Council Meeting and CALAS Annual Sessions, 2024",
    meta: "News | 2024",
    description: [
      "Delegates attended the key council meetings to determine the future direction of Asian laboratory animal science collaborations.",
    ],
    // Grid of 2 wide images
    images: [
      "https://placehold.co/800x300/d1fae5/065f46?text=AFLAS+Council+Meeting+Hall",
      "https://placehold.co/800x300/dbeafe/1e40af?text=CALAS+Annual+Session+Group",
    ],
  },
  {
    title:
      "Japanese Association for Laboratory Animal Science (JALAS) International Award 2024",
    meta: "Awards & Recognition | 2024",
    description: [
      "Congratulations to Dr. [Name Redacted] for receiving the prestigious JALAS International Award in Kyoto, recognizing outstanding contributions to the field.",
    ],
    // Grid of 3 vertical-ish images
    images: [
      "https://placehold.co/500x700/f3f4f6/1f2937?text=Award+Ceremony+Group",
      "https://placehold.co/500x700/f3f4f6/1f2937?text=JALAS+Signage+Kyoto",
      "https://placehold.co/500x700/f3f4f6/1f2937?text=Holding+The+Certificate",
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      {/* 1. Hero Slider at the top */}
      <HeroSlider />

      {/* 3. Welcome Text Section */}
      <WelcomeSection />

      {/* 4. Main Content Feed */}
      {/* <section className="bg-white py-8">
        {feedData.map((item, index) => (
          <ContentFeedItem
            key={index}
            title={item.title}
            meta={item.meta}
            description={item.description}
            images={item.images}
          />
        ))}
      </section> */}

      <Footer />
    </main>
  );
}
