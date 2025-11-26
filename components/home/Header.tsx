"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Updated Data Structure to support sub-menus
  const navItems = [
    { label: "ABOUT US", href: "/about" },
    {
      label: "NEWS & EVENTS",
      // subItems indicates this is a dropdown
      subItems: [
        { label: "Latest News", href: "/news" },
        { label: "Upcoming Events", href: "/events" },
      ],
    },
    { label: "JOIN SLALAS", href: "/join" }, // Fixed typo "JOHN" -> "JOIN"?
    { label: "PUBLICATIONS", href: "/publications" },
    { label: "CONTACT US", href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/logo.png"
              alt="SLALAS Logo"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {/* Logic: If it has subItems, render a group container. 
                   If not, render a standard Link.
                */}
                {item.subItems ? (
                  <>
                    <button className="flex items-center text-gray-700 hover:text-blue-600 font-bold text-sm transition-colors duration-200 uppercase tracking-wide py-4">
                      {item.label}
                      {/* Chevron Icon */}
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu (Visible on Hover) */}
                    <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`font-bold text-sm uppercase tracking-wide transition-colors duration-200 ${
                      pathname === item.href
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 pb-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-1 border-t pt-4 bg-gray-50 rounded-b-lg">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.subItems ? (
                  // Mobile: Group Header + Indented Links
                  <div className="flex flex-col">
                    <span className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
                      {item.label}
                    </span>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="pl-8 pr-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-sm border-l-4 border-transparent hover:border-blue-600 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  // Mobile: Standard Link
                  <Link
                    href={item.href || "#"}
                    className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-bold text-sm uppercase transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
