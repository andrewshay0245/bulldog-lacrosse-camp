export const metadata = {
  title: 'FAQ | Bulldog Lacrosse Camps',
  description: 'Frequently asked questions about Bulldog Lacrosse Camps including refund policies, parking, and more.',
};

export default function FAQPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00356b] to-[#286dc0] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-200">Everything you need to know about our camps</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Refund Policy - Camps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Refund Policy - Day Camps, Clinics & Trainings</h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-700">
                Due to the fixed and administrative expenses associated with operating Bulldog Lacrosse Camps,
                the following payment and refund policy applies to ALL applications/registrations:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  A minimum <strong>$50 non-refundable processing fee</strong> will be charged on all refunds.
                </li>
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  A <strong>doctor&apos;s note is required</strong> for refunds requested due to injury.
                </li>
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  To be eligible for a refund, you must contact us <strong>BY EMAIL at least 14 days prior</strong> to the start of camp.
                </li>
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  If you contact us within <strong>14 days or less</strong> from the start of camp, you will <strong>NOT be eligible for a refund</strong>.
                </li>
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  <strong>Inclement Weather:</strong> There will be no refunds for event cancellation due to weather on the day of the event.
                </li>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Bulldog Lacrosse Camp reserves the right to issue any refund for any amount for special circumstances.
              </p>
            </div>
          </div>

          {/* Parking */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Parking & Directions</h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-700">
                All cars will be directed to the intersection of <strong>Chapel Street and Yale Avenue</strong>.
                Once inside the gates of the Yale Bowl area, cars will be funneled to <strong>Lots E, F, and H</strong>.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  <strong>Day Camps & Prospect Days:</strong> Parking is free.
                </li>
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  <strong>Yale Tournaments:</strong> $10 cash parking fee per car. This fee is charged by Yale University and is not controlled by Bulldog Lacrosse Camps.
                </li>
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  Directional signs will be posted on all roadways.
                </li>
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  Please respect all &quot;NO PARKING&quot; signs - violators will be towed.
                </li>
                <li className="flex items-start">
                  <span className="text-[#00356b] font-bold mr-2">•</span>
                  Please park where directed and respect the neighborhood.
                </li>
              </ul>
            </div>
          </div>

          {/* Location */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Location</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-2">
                <strong>Reese Stadium</strong>
              </p>
              <p className="text-gray-700">
                75 Central Ave<br />
                New Haven, CT 06515
              </p>
            </div>
          </div>

          {/* What to Bring */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#00356b]">What to Bring</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Lacrosse stick</li>
                  <li>• Helmet with face mask</li>
                  <li>• Gloves</li>
                  <li>• Arm pads</li>
                  <li>• Shoulder pads</li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cleats</li>
                  <li>• Mouthguard</li>
                  <li>• Water bottle</li>
                  <li>• Sunscreen</li>
                  <li>• Snacks (if desired)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Video Policy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Video Policy (Prospect Events)</h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-700">
                Bulldog Lacrosse Camps partners with <strong>Next Level Video</strong> for prospect events.
                All games will be filmed in HD from an elevated position.
              </p>
              <p className="text-gray-700">
                Spectators may record for personal, non-commercial use provided that:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• They do not interfere with NLV Videographer duties</li>
                <li>• They do not film with professional &quot;elevated&quot; equipment (more than 5 feet above ground level)</li>
              </ul>
              <p className="text-gray-600 text-sm">
                Questions about video? Contact: info@nlvproductions.com
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Contact Us</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Have a question not answered here? Reach out to us:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:blclacrossecamps@gmail.com" className="text-[#00356b] hover:underline">
                  blclacrossecamps@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center text-gray-500 text-sm">
            <p>
              All Bulldog Lacrosse Camps are open to any and all entrants.
              Limited only by number, age, grade level and/or gender.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
