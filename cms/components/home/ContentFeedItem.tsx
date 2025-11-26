// src/components/home/ContentFeedItem.tsx
import Image from "next/image";
import Link from "next/link";

interface ContentFeedItemProps {
  title: string;
  meta: string;
  description: string[]; // Array of paragraphs
  images: string[]; // Array of image URLs
  link?: string;
}

export default function ContentFeedItem({
  title,
  meta,
  description,
  images,
  link,
}: ContentFeedItemProps) {
  const isImageGrid = images.length > 1;

  return (
    <article className="py-10 border-b border-gray-200 last:border-0">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 hover:text-blue-800 transition">
            {link ? <Link href={link}>{title}</Link> : title}
          </h2>
          <p className="text-sm text-teal-600 font-medium mt-2">{meta}</p>
        </div>

        {/* Image Section - Conditional Layout */}
        <div className="mb-6">
          {isImageGrid ? (
            // Grid Layout for multiple images (e.g., the bottom examples in screenshot)
            <div
              className={`grid gap-4 ${
                images.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3"
              }`}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <Image
                    src={img}
                    alt={`${title} image ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            // Single Banner Image Layout (e.g., top examples in screenshot)
            <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
              <Image
                src={images[0]}
                alt={title}
                fill
                className="object-contain bg-gray-50"
              />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {description.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
