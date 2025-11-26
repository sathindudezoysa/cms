const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">CONTACT DETAILS</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a
                    href="mailto:slajasad@gmail.com"
                    className="hover:text-blue-300"
                  >
                    slajasad@gmail.com
                  </a>
                </p>
                <p>Secretary/SLALAS</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">QUICK LINKS</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-blue-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#events" className="hover:text-blue-300">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#conference" className="hover:text-blue-300">
                    Conference
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Membership */}
            <div>
              <h3 className="text-xl font-semibold mb-4">MEMBERSHIP</h3>
              <p className="mb-4">
                Join SLALAS to be part of the laboratory animal science
                community in Sri Lanka.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
                Become a Member
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>© 2024 SLALAS. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
