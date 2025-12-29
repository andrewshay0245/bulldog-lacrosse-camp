import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#00356b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/by-logo.jpg"
                alt="Bulldog Lacrosse Camps"
                width={50}
                height={50}
                className="rounded"
              />
              <h3 className="text-xl font-bold font-display tracking-wider">BULLDOG LACROSSE CAMPS</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Premier lacrosse instruction at Yale University&apos;s Reese Stadium.
              Learn from Yale coaches, college coaches, and elite players.
            </p>
            <p className="text-gray-300">
              <strong>Location:</strong><br />
              Reese Stadium<br />
              75 Central Ave<br />
              New Haven, CT 06515
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/camps/summer" className="hover:text-white">Summer Camp</Link></li>
              <li><Link href="/camps/bulldog-120" className="hover:text-white">Bulldog 120</Link></li>
              <li><Link href="/camps/experience" className="hover:text-white">Bulldog Experience</Link></li>
              <li><Link href="/prospects/clash" className="hover:text-white">Bulldog Clash</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="mailto:blclacrossecamps@gmail.com" className="hover:text-white">
                  blclacrossecamps@gmail.com
                </a>
              </li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bulldog Lacrosse Camps. All rights reserved.</p>
          <p className="mt-2 text-sm">
            All Bulldog Lacrosse Camps are open to any and all entrants. Limited only by number, age, grade level and/or gender.
          </p>
        </div>
      </div>
    </footer>
  );
}
