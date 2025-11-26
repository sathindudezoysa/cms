// src/components/home/HeroSlider.tsx
"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

// Define your fixed local images here
// The paths start from the 'public' folder
const heroImages = [
  {
    src: "/hero/cover.jpg",
    alt: "SLALAS Conference Group Photo 2024",
  },
  {
    src: "/hero/image2.jpg",
    alt: "Laboratory Animal Science Workshop",
  },
  {
    src: "/hero/image3.jpg",
    alt: "Annual General Meeting Delegates",
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full relative">
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={6000} // Speed: 6 seconds
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        showIndicators={true} // Dots at the bottom
      >
        {heroImages.map((slide, index) => (
          <div key={index} className="relative h-[300px] md:h-[550px] w-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              // 'priority' ensures the first image loads immediately (good for LCP score)
              priority={index === 0}
              quality={90}
            />

            {/* Optional: Add a dark gradient overlay so text pops if you add it later */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
