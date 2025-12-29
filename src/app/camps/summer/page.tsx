import Link from 'next/link';

export const metadata = {
  title: 'Summer Camp | Bulldog Lacrosse Camps',
  description: 'Join our 4-day summer lacrosse camp for players ages 7-17 at Yale University\'s Reese Stadium.',
};

export default function SummerCampPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00356b] to-[#286dc0] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bulldog Lacrosse Camp</h1>
          <p className="text-xl text-gray-200">Ages 7-17 | 4 Days | Reese Stadium</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">About the Camp</h2>
              <p className="text-gray-700 mb-6">
                The Bulldog Summer Lacrosse Camp is a 4-day instructional camp that provides players
                the opportunity to learn from members of the Yale Men&apos;s Lacrosse Staff, area college
                coaches, local high school coaches, and Yale Men&apos;s Lacrosse players.
              </p>
              <p className="text-gray-700 mb-6">
                The first half of camp is spent developing the individual player. Individual skills
                are taught and refined through focused instruction. The second half of camp is
                dedicated to incorporating skills learned into games and scrimmage situations.
              </p>
              <p className="text-gray-700 mb-8">
                Campers are placed in groups based on both age and skill level, ensuring a
                rewarding experience for all players regardless of experience. Every camper
                receives firsthand instruction from Yale players and coaches.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">What&apos;s Included</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Four days of positional coaching</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Small-sided games and scrimmages</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lacrosse pinny provided to all campers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Daily prize drawings</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Instruction from Yale coaches and players</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">What to Bring</h2>
              <ul className="space-y-2 text-gray-700 mb-8">
                <li>• Lacrosse stick</li>
                <li>• Helmet with face mask</li>
                <li>• Gloves</li>
                <li>• Arm pads</li>
                <li>• Shoulder pads</li>
                <li>• Cleats</li>
                <li>• Mouthguard</li>
                <li>• Water bottle</li>
                <li>• Sunscreen</li>
              </ul>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-[#00356b]">$350</span>
                  <p className="text-gray-600">per camper</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ages:</span>
                    <span className="font-semibold">7-17</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">4 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">Reese Stadium</span>
                  </div>
                </div>

                <Link
                  href="/register?camp=summer"
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
