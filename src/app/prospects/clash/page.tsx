import ClashAvailability from '@/components/ClashAvailability';

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
      <section
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/action-1.jpg)' }}
      >
        <div className="absolute inset-0 bg-[#00356b]/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Bulldog Clash 2026</h1>
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
              <ClashAvailability />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
