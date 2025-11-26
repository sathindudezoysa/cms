// src/components/home/WelcomeSection.tsx
export default function WelcomeSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-left max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
          Welcome to the official Website of SAAT-SL
        </h1>
        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
          <p>
            SAAT-SL is a non-profit scientific organization that promotes
            responsible and humane use of laboratory animals in research,
            testing and teaching in Sri Lanka.
          </p>
          <p>
            It acts as the national focal point for laboratory animal science in
            the country.
          </p>
          <p className="font-medium text-slate-700">
            Our mission is to promote laboratory animal science and welfare in
            Sri Lanka through education, training, and research.
          </p>
        </div>
      </div>
    </section>
  );
}
