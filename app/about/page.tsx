import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* 1. Page Banner */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SAAT-SL</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Sri Lanka Association for Laboratory Animal Science
          </p>
        </div>
      </section>

      {/* 2. Introduction & History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
            {/* Placeholder for a group photo or historical event */}
            <Image
              src="/hero/cover.jpg"
              alt="SLALAS Inauguration"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              The Sri Lanka Association for Laboratory Animal Science (SLALAS)
              is a non-profit scientific organization that acts as the national
              focal point for laboratory animal science in the country.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Since our inception, we have been dedicated to promoting the
              responsible and humane use of laboratory animals in research,
              testing, and teaching. We serve as a platform for scientists,
              veterinarians, and researchers to collaborate and advance the
              ethical standards of animal research in Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-blue-600">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be the leading authority in promoting ethical and scientific
                excellence in laboratory animal science within the Asian region.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-green-600">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To promote laboratory animal science and welfare in Sri Lanka
                through education, training, and research, ensuring ethical
                standards are met in all scientific endeavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Objectives List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Our Objectives
          </h2>
          <ul className="space-y-4">
            {[
              "To promote the 3Rs (Replacement, Reduction, Refinement) in animal research.",
              "To provide education and training for personnel involved in animal care and use.",
              "To facilitate information exchange among scientists and institutions.",
              "To formulate guidelines and codes of practice for the care and use of laboratory animals.",
              "To represent Sri Lanka in international laboratory animal science organizations.",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700 bg-gray-50 p-4 rounded-lg"
              >
                <span className="text-green-600 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Council / Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Executive Council
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Generating 4 placeholder members */}
            {[1, 2, 3, 4].map((member) => (
              <div
                key={member}
                className="bg-white rounded-lg shadow-sm overflow-hidden text-center group"
              >
                <div className="relative h-64 w-full bg-gray-200">
                  {/* <Image
                    src={`https://placehold.co/400x400/cbd5e1/1e293b?text=Member+${member}`}
                    alt="Council Member"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  /> */}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900">Dr. Name Surname</h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">
                    Position Title
                  </p>
                  <p className="text-xs text-gray-500">
                    University / Institution
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
