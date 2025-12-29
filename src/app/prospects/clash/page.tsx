import Link from 'next/link';

export const metadata = {
  title: 'Bulldog Clash | Bulldog Lacrosse Camps',
  description: 'Elite prospect showcase with top college coaches from Yale, Notre Dame, Duke, UNC, Navy, Army, and more.',
};

export default function ClashPage() {
  const coaches = [
    { name: 'Andy Shay', school: 'Yale' },
    { name: 'Chris Wojcik', school: 'Notre Dame' },
    { name: 'Gerry Byrne', school: 'Harvard' },
    { name: 'Ron Caputo', school: 'Duke' },
    { name: 'Dave Pietramala', school: 'North Carolina' },
    { name: 'Joe Amplo', school: 'Navy' },
    { name: 'Joe Alberici', school: 'Army' },
    { name: 'Andrew Baxter', school: 'Fairfield' },
    { name: 'John Tillman', school: 'Maryland' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00356b] to-[#286dc0] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bulldog Clash 2026</h1>
          <p className="text-xl text-gray-200">Elite Prospect Showcase | Classes of 2028 & 2029</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">About the Bulldog Clash</h2>
              <p className="text-gray-700 mb-6">
                The Bulldog Clash is an elite individual showcase for the classes of 2028 and 2029.
                This premier recruiting event brings together top prospects with coaches from the
                nation&apos;s best college lacrosse programs.
              </p>
              <p className="text-gray-700 mb-8">
                All games are filmed in HD by Next Level Video from an elevated position, providing
                college coaches with quality film to evaluate prospects who couldn&apos;t attend in person.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Coaching Staff</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {coaches.map((coach) => (
                  <div key={coach.name} className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="font-semibold">{coach.name}</p>
                    <p className="text-sm text-gray-600">{coach.school}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Event Details</h2>
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-semibold">Friday, June 12, 2026</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time</p>
                    <p className="font-semibold">3:00 PM - 10:00 PM</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-semibold">Reese Stadium, Yale University</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Graduation Years</p>
                    <p className="font-semibold">2028 & 2029</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Video Coverage</h2>
              <p className="text-gray-700 mb-4">
                All games will be filmed in HD from an elevated position by Next Level Video.
                Spectators may record for personal, non-commercial use provided they do not
                interfere with NLV operations or use elevated equipment.
              </p>
              <p className="text-gray-600 text-sm">
                Questions about video? Contact: info@nlvproductions.com
              </p>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-[#00356b]">$350</span>
                  <p className="text-gray-600">per position</p>
                </div>

                <h3 className="font-semibold mb-4">Registration Options</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span>Attack</span>
                    <span className="font-semibold">$350</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Midfield</span>
                    <span className="font-semibold">$350</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Defense & LSM</span>
                    <span className="font-semibold">$350</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Face Off</span>
                    <span className="font-semibold">$350</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>Goalie</span>
                    <span className="font-semibold">SOLD OUT</span>
                  </div>
                </div>

                <Link
                  href="/register?camp=clash"
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
