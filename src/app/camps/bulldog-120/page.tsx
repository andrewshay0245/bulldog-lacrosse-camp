import Link from 'next/link';

export const metadata = {
  title: 'Bulldog 120 | Bulldog Lacrosse Camps',
  description: 'Yale-specific prospect day for high school players. Coaches from Yale, NESCAC, and area D1 programs attend.',
};

const heroImages = [
  '/images/action-1.jpg',
  '/images/action-3.jpg',
  '/images/camp-1.jpg',
  '/images/camp-2.jpg',
  '/images/camp-3.jpg',
];

export default function Bulldog120Page() {
  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${randomImage})` }}
      >
        <div className="absolute inset-0 bg-[#00356b]/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Bulldog 120</h1>
          <p className="text-xl text-gray-200">High School Players | Yale-Specific Prospect Day</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">About Bulldog 120</h2>
              <p className="text-gray-700 mb-6">
                The Bulldog 120 is a Yale-specific prospect day designed for high school players
                interested in Yale lacrosse. This intensive clinic format provides an opportunity
                to showcase your skills in front of college coaches.
              </p>
              <p className="text-gray-700 mb-6">
                Coaches from Yale, NESCAC schools, and area Division I programs attend to evaluate
                talent. Players receive instruction, compete in drills, and demonstrate their
                abilities in game situations.
              </p>
              <p className="text-gray-700 mb-8">
                This is an excellent opportunity for players serious about playing at the collegiate
                level, particularly those interested in Yale and similar academic/athletic programs.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Event Highlights</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Yale-specific prospect day format</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Coaches from Yale, NESCAC, and D1 programs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Intensive clinic format</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Competitive drills and game situations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Great for players interested in Yale lacrosse</span>
                </li>
              </ul>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-[#00356b]">$235</span>
                  <p className="text-gray-600">per player</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ages:</span>
                    <span className="font-semibold">High School</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">Reese Stadium</span>
                  </div>
                </div>

                <Link
                  href="/register?camp=bulldog-120"
                  className="block w-full bg-[#00356b] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#286dc0] transition"
                >
                  Register Now
                </Link>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Questions? Email{' '}
                  <a href="mailto:blclacrossecamps@gmail.com" className="text-[#00356b] hover:underline">
                    blclacrossecamps@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
