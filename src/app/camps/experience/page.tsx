import Link from 'next/link';

export const metadata = {
  title: 'Bulldog Experience | Bulldog Lacrosse Camps',
  description: 'Immersive lacrosse training experience for high school players at Yale University.',
};

export default function ExperiencePage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/training-2.jpg)' }}
      >
        <div className="absolute inset-0 bg-[#00356b]/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Bulldog Experience</h1>
          <p className="text-xl text-gray-200">High School Players | Elite-Level Instruction</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">About the Bulldog Experience</h2>
              <p className="text-gray-700 mb-6">
                The Bulldog Experience offers high school players an immersive training
                environment with elite-level instruction. This program goes beyond typical
                camp instruction to provide a comprehensive lacrosse development experience.
              </p>
              <p className="text-gray-700 mb-6">
                Players will experience what it&apos;s like to train at a top Division I program,
                learning the systems, techniques, and mentality that define championship-level
                lacrosse. Our coaching staff provides individualized attention and actionable
                feedback.
              </p>
              <p className="text-gray-700 mb-8">
                The Bulldog Experience is perfect for serious players committed to improving
                their game and understanding what it takes to compete at the next level.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Program Highlights</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Division I training environment</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>System and scheme instruction</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalized skill development</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Competitive game situations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Recruiting process insights</span>
                </li>
              </ul>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-[#00356b]">$135</span>
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
                  href="/register?camp=experience"
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
