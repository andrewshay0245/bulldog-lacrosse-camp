import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero Section - Parallax Background */}
      <section
        className="relative h-screen min-h-[700px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#00356b]/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg font-display uppercase tracking-wide">
            Bulldog Lacrosse Camps
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Premier lacrosse instruction at Yale University&apos;s Reese Stadium.
            Learn from Yale coaches, top college coaches, and elite players.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-[#00356b] text-lg px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg">
              Register Now
            </Link>
            <Link href="/camps/summer" className="bg-transparent border-2 border-white text-white text-lg px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#00356b] transition">
              View Camps
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#00356b] font-display uppercase tracking-wide">Our Programs</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            From youth development to elite prospect showcases, we have a program for every level.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Summer Camp */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/camp-1.jpg"
                  alt="Summer Camp"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-white font-bold text-lg">Summer Camp</span>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm">4-day instructional camp for players ages 7-17. Learn fundamentals from Yale coaches.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#00356b]">$350</span>
                  <Link href="/camps/summer" className="text-[#00356b] font-semibold hover:underline text-sm">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bulldog 120 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/training-1.jpg"
                  alt="Bulldog 120"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-white font-bold text-lg">Bulldog 120</span>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm">Intensive clinic for high school players looking to elevate their game.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#00356b]">$125</span>
                  <Link href="/camps/bulldog-120" className="text-[#00356b] font-semibold hover:underline text-sm">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bulldog Experience */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/training-2.jpg"
                  alt="Bulldog Experience"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-white font-bold text-lg">Bulldog Experience</span>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm">Immersive training experience for high school players with elite instruction.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#00356b]">$135</span>
                  <Link href="/camps/experience" className="text-[#00356b] font-semibold hover:underline text-sm">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bulldog Clash */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/action-3.jpg"
                  alt="Bulldog Clash"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-white font-bold text-lg">Bulldog Clash</span>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm">Elite prospect showcase with coaches from Yale, Notre Dame, Duke, UNC & more.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#00356b]">$350</span>
                  <Link href="/prospects/clash" className="text-[#00356b] font-semibold hover:underline text-sm">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Image Banner */}
      <section
        className="relative h-96 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url(/images/action-1.jpg)' }}
      >
        <div className="absolute inset-0 bg-[#00356b]/70"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg font-display uppercase tracking-wide">Train Like a Bulldog</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Experience world-class coaching at one of the premier lacrosse facilities in the country.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#00356b] font-display uppercase tracking-wide">Why Bulldog Lacrosse Camps?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#00356b] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">World-Class Facility</h3>
              <p className="text-gray-600">Train at Yale&apos;s Reese Stadium, home of Yale Lacrosse and one of the premier lacrosse facilities in the country.</p>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#00356b] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Elite Coaching</h3>
              <p className="text-gray-600">Learn from Yale coaches, current players, and guest coaches from top Division I programs across the country.</p>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#00356b] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-gray-600">Join hundreds of players who have developed their skills and advanced to the next level through our programs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#00356b]">Camp Action</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image src="/images/camp-2.jpg" alt="Camp action" fill className="object-cover hover:scale-105 transition duration-300" />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image src="/images/camp-3.jpg" alt="Camp action" fill className="object-cover hover:scale-105 transition duration-300" />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image src="/images/action-2.jpg" alt="Camp action" fill className="object-cover hover:scale-105 transition duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#00356b]">Location & Parking</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Reese Stadium</h3>
                  <p className="text-gray-600">75 Central Ave, New Haven, CT 06515</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Parking</h3>
                  <p className="text-gray-600">
                    Enter via Chapel Street and Yale Avenue. Cars will be directed to Lots E, F, and H.
                    <strong className="block mt-1">$10 per car</strong> (Yale University policy)
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Questions?</h3>
                  <p className="text-gray-600">
                    Email us at{' '}
                    <a href="mailto:blclacrossecamps@gmail.com" className="text-[#00356b] hover:underline">
                      blclacrossecamps@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl h-80 overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.123456!2d-72.9614!3d41.3089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d8443a8b8b8b%3A0x1234567890abcdef!2sReese%20Stadium!5e0!3m2!1sen!2sus!4v1703123456789"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-24 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url(/images/action-2.jpg)' }}
      >
        <div className="absolute inset-0 bg-[#00356b]/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white font-display uppercase tracking-wide">Ready to Take Your Game to the Next Level?</h2>
          <p className="text-xl text-gray-200 mb-8">Spots fill up fast. Register today to secure your place.</p>
          <Link href="/register" className="inline-block bg-white text-[#00356b] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
