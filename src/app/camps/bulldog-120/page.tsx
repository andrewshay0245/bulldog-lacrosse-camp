import Link from 'next/link';

export const metadata = {
  title: 'Bulldog 120 | Bulldog Lacrosse Camps',
  description: 'Intensive lacrosse clinic for high school players at Yale University.',
};

export default function Bulldog120Page() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00356b] to-[#286dc0] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bulldog 120</h1>
          <p className="text-xl text-gray-200">High School Players | Intensive Training</p>
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
                The Bulldog 120 is an intensive training clinic designed specifically for
                high school players looking to elevate their game to the next level.
                This focused session provides concentrated instruction from college-level
                coaches and current players.
              </p>
              <p className="text-gray-700 mb-6">
                Named for the intensity and focus packed into every minute, the Bulldog 120
                emphasizes skill refinement, game IQ development, and competitive play.
                Players receive personalized feedback and advanced techniques used at the
                collegiate level.
              </p>
              <p className="text-gray-700 mb-8">
                Whether you&apos;re preparing for high school varsity tryouts or looking to
                get noticed by college recruiters, the Bulldog 120 provides the edge you need.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">What You&apos;ll Learn</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced positional techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Game situation decision-making</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Competitive drills and scenarios</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Film study and feedback</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>College preparation guidance</span>
                </li>
              </ul>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-[#00356b]">$125</span>
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
