'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campsDropdown, setCampsDropdown] = useState(false);
  const [prospectsDropdown, setProspectsDropdown] = useState(false);

  return (
    <nav className="bg-[#00356b] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/by-logo.jpg"
              alt="Bulldog Lacrosse Camps"
              width={44}
              height={44}
              className="rounded"
            />
            <span className="text-lg font-bold hidden sm:inline font-display tracking-wider">BULLDOG LACROSSE CAMPS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-300 transition">Home</Link>

            {/* Camps Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCampsDropdown(true)}
              onMouseLeave={() => setCampsDropdown(false)}
            >
              <button className="hover:text-gray-300 transition flex items-center">
                Camps
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {campsDropdown && (
                <div className="absolute top-full left-0 bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-48">
                  <Link href="/camps/summer" className="block px-4 py-2 hover:bg-gray-100">Summer Camp (Ages 7-17)</Link>
                  <Link href="/camps/bulldog-120" className="block px-4 py-2 hover:bg-gray-100">Bulldog 120 (HS)</Link>
                  <Link href="/camps/experience" className="block px-4 py-2 hover:bg-gray-100">Bulldog Experience (HS)</Link>
                </div>
              )}
            </div>

            {/* Prospects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProspectsDropdown(true)}
              onMouseLeave={() => setProspectsDropdown(false)}
            >
              <button className="hover:text-gray-300 transition flex items-center">
                Prospects
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {prospectsDropdown && (
                <div className="absolute top-full left-0 bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-56">
                  <Link href="/prospects/clash" className="block px-4 py-2 hover:bg-gray-100">Bulldog Clash</Link>
                  <a href="https://nxtsports.com/events/boys-summer-bulldog-bash/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-gray-100">
                    Summer Bulldog Bash →
                  </a>
                  <div className="block px-4 py-2 text-gray-400 cursor-not-allowed">
                    <span>Fall Bulldog Bash</span>
                    <span className="block text-xs">(2026 Dates coming soon)</span>
                  </div>
                </div>
              )}
            </div>

            <Link href="/lessons" className="hover:text-gray-300 transition">Lessons</Link>
            <Link href="/gallery" className="hover:text-gray-300 transition">Gallery</Link>
            <Link href="/faq" className="hover:text-gray-300 transition">FAQ</Link>
            <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
            <Link href="/register" className="bg-white text-[#00356b] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#00356b] border-t border-blue-800 px-4 py-4 space-y-3">
          <Link href="/" className="block py-2">Home</Link>
          <div className="border-t border-blue-800 pt-2">
            <p className="text-gray-300 text-sm mb-2">Camps</p>
            <Link href="/camps/summer" className="block py-2 pl-4">Summer Camp</Link>
            <Link href="/camps/bulldog-120" className="block py-2 pl-4">Bulldog 120</Link>
            <Link href="/camps/experience" className="block py-2 pl-4">Bulldog Experience</Link>
          </div>
          <div className="border-t border-blue-800 pt-2">
            <p className="text-gray-300 text-sm mb-2">Prospects</p>
            <Link href="/prospects/clash" className="block py-2 pl-4">Bulldog Clash</Link>
            <a href="https://nxtsports.com/events/boys-summer-bulldog-bash/" target="_blank" className="block py-2 pl-4">Summer Bulldog Bash →</a>
            <div className="block py-2 pl-4 text-gray-500">
              <span>Fall Bulldog Bash</span>
              <span className="text-xs ml-1">(2026 Dates coming soon)</span>
            </div>
          </div>
          <Link href="/lessons" className="block py-2 border-t border-blue-800 pt-4">Lessons</Link>
          <Link href="/gallery" className="block py-2">Gallery</Link>
          <Link href="/faq" className="block py-2">FAQ</Link>
          <Link href="/contact" className="block py-2">Contact</Link>
          <Link href="/register" className="block bg-white text-[#00356b] text-center py-3 rounded-lg font-semibold mt-4">
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
}
