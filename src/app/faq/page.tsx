export const metadata = {
  title: 'FAQ | Bulldog Lacrosse Camps',
  description: 'Frequently asked questions about Bulldog Lacrosse Camps including registration, refunds, parking, and more.',
};

const heroImages = [
  '/images/action-1.jpg',
  '/images/action-3.jpg',
  '/images/camp-1.jpg',
  '/images/camp-2.jpg',
  '/images/camp-3.jpg',
];

interface FAQItem {
  question: string;
  answer: string | string[];
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: 'Registration & Payment',
    items: [
      {
        question: 'How do I register?',
        answer: 'Select your desired event on the menu above. Registration is complete once payment is processed.',
      },
      {
        question: 'What forms of payment do you accept?',
        answer: 'We accept all major credit cards through our secure online registration system.',
      },
      {
        question: 'Is there a discount for multiple campers or groups?',
        answer: 'Yes. If your town registers 15 or more campers, your town\'s recreation director or youth coordinator gets to award a full scholarship to a deserving local player. Contact us at blclacrossecamps@gmail.com for group registration details.',
      },
      {
        question: 'When is the registration deadline?',
        answer: 'We recommend registering early as sessions can fill up. Check the website for specific session availability.',
      },
    ],
  },
  {
    title: 'Refund Policy',
    items: [
      {
        question: 'What is your refund policy?',
        answer: [
          'A $50 non-refundable processing fee applies to all refunds',
          'Refunds requested more than 14 days before camp: eligible for refund (minus $50 fee)',
          'Refunds requested 14 days or less before camp: not eligible for refund',
          'Medical cancellations require a doctor\'s note',
          'No refunds for weather-related cancellations on the day of camp',
        ],
      },
      {
        question: 'What if my child gets injured before camp?',
        answer: 'Contact us by email at blclacrossecamps@gmail.com with a doctor\'s note. Medical cancellations are reviewed on a case-by-case basis.',
      },
      {
        question: 'Can I transfer my registration to another session?',
        answer: 'Contact us at least 14 days before your original session to discuss transfer options, subject to availability.',
      },
    ],
  },
  {
    title: 'Camp Details',
    items: [
      {
        question: 'What ages and skill levels do you accept?',
        answer: 'Bulldog Lacrosse Camps are designed for players of all skill levels, from beginners to experienced varsity players. Check specific camp listings for age requirements.',
      },
      {
        question: 'How are campers grouped?',
        answer: 'Campers are divided by age and ability level to ensure appropriate instruction and competition. Our staff evaluates players on the first day and adjusts groupings as needed.',
      },
      {
        question: 'What does a typical camp day look like?',
        answer: 'Each session includes skill instruction, position-specific training, and competitive play. The schedule balances technical development with games and scrimmages. Detailed schedules are provided upon registration confirmation.',
      },
      {
        question: 'Who are the coaches?',
        answer: 'Our camps are staffed by Yale University coaches and players, along with experienced high school and college coaches. All staff are selected for their lacrosse knowledge and ability to work with young athletes.',
      },
    ],
  },
  {
    title: 'What to Bring',
    items: [
      {
        question: 'Required equipment:',
        answer: [
          'Lacrosse stick',
          'Helmet with face mask (NOCSAE certified)',
          'Gloves',
          'Arm pads',
          'Shoulder pads',
          'Cleats',
          'Mouthguard (required—no exceptions)',
          'Water bottle',
        ],
      },
      {
        question: 'Recommended items:',
        answer: [
          'Sunscreen (applied before arrival)',
          'Snacks',
          'Extra clothes',
          'Backup mouthguard',
        ],
      },
      {
        question: 'What if my child is missing equipment?',
        answer: 'All required equipment must be brought to camp. We do not have loaner equipment available. Please ensure all gear is in good condition and properly fitted before camp begins.',
      },
    ],
  },
  {
    title: 'Drop-Off & Pick-Up',
    items: [
      {
        question: 'Where is camp held?',
        answer: 'Reese Stadium, 75 Central Ave, New Haven, CT 06515',
      },
      {
        question: 'Where do I drop off and pick up my child?',
        answer: 'All vehicles enter at the intersection of Chapel Street and Yale Avenue. Once inside the Yale Bowl area, follow signs to Lots E, F, and H. Staff will direct you to the check-in/check-out area.',
      },
      {
        question: 'What time is drop-off and pick-up?',
        answer: 'Specific times are listed on your registration confirmation. Please arrive on time—early drop-off is not available, and late pick-up disrupts camp operations.',
      },
      {
        question: 'Who can pick up my child?',
        answer: 'Only individuals listed as authorized on your registration form may pick up your camper. Please bring photo ID. If someone new needs to pick up your child, email us in advance with their name.',
      },
      {
        question: 'What if I\'m running late for pick-up?',
        answer: 'Call us immediately. Repeated late pick-ups may result in additional fees or dismissal from camp.',
      },
    ],
  },
  {
    title: 'Parking',
    items: [
      {
        question: 'Is parking free?',
        answer: [
          'Day Camps & Prospect Days: Free parking',
          'Yale Tournaments: $10 cash per car (charged by Yale University, not Bulldog Lacrosse Camps)',
        ],
      },
      {
        question: 'Where should I park?',
        answer: 'Follow directional signs to Lots E, F, or H. Respect all "NO PARKING" signs—violators will be towed. Please park only in designated areas and be respectful of the surrounding neighborhood.',
      },
    ],
  },
  {
    title: 'Health & Safety',
    items: [
      {
        question: 'Do you have medical staff on site?',
        answer: 'Yes. Certified athletic trainers are on site during all camp sessions to respond to injuries and provide first aid.',
      },
      {
        question: 'What services do the athletic trainers provide?',
        answer: 'Our athletic trainers handle injury evaluation, first aid, and emergency response. Please note: this is not a college team setting—trainers will not provide preventive services like ankle taping or pre-activity preparation. Campers should arrive ready to play.',
      },
      {
        question: 'What happens if my child gets injured?',
        answer: 'Minor injuries are evaluated and treated on-site by our athletic training staff. Parents are notified of any injury. In case of a serious emergency, 911 will be called immediately, followed by parent notification.',
      },
      {
        question: 'What if my child has a medical condition (asthma, allergies, diabetes, etc.)?',
        answer: 'Please indicate all medical conditions, allergies, and medications on your registration form. Contact us before camp to discuss specific needs so we can ensure proper care.',
      },
      {
        question: 'Does my child need a physical exam to attend?',
        answer: 'We recommend a current sports physical, but it is not required. You must complete the health information section of the registration form.',
      },
      {
        question: 'What about medications?',
        answer: 'All medications (prescription or over-the-counter) must be in original containers with clear labels. Notify us of any medications your child needs during camp hours. Campers may not carry their own medication.',
      },
      {
        question: 'What is your illness policy?',
        answer: 'If your child is sick (fever, vomiting, contagious illness), please keep them home. If a camper becomes ill during camp, parents will be contacted for pick-up.',
      },
    ],
  },
  {
    title: 'Weather',
    items: [
      {
        question: 'What happens if there\'s bad weather?',
        answer: 'Camp runs rain or shine. In the event of lightning, campers move to a sheltered area until conditions are safe. We do not cancel for rain alone.',
      },
      {
        question: 'Are there refunds for weather cancellations?',
        answer: 'No refunds are issued for weather-related cancellations or delays on the day of camp.',
      },
      {
        question: 'What about extreme heat?',
        answer: 'We monitor heat index closely. In high-heat conditions, we increase water breaks, shorten sessions, and provide shaded rest periods. Campers should arrive hydrated and with a full water bottle.',
      },
    ],
  },
  {
    title: 'Communication',
    items: [
      {
        question: 'How will I receive camp information?',
        answer: 'After registration, you\'ll receive a confirmation email with all details including schedule, location, what to bring, and check-in procedures. Review this information carefully.',
      },
      {
        question: 'What if I have a question during camp?',
        answer: 'Our staff are available at check-in and check-out. For urgent matters during camp hours, call the number provided in your confirmation packet.',
      },
      {
        question: 'How do I contact you?',
        answer: 'Email: blclacrossecamps@gmail.com. Please allow 24-48 hours for a response during peak registration periods.',
      },
    ],
  },
  {
    title: 'Spectators & Video',
    items: [
      {
        question: 'Can parents watch?',
        answer: 'Yes, parents are welcome to observe from designated spectator areas. Please do not enter the playing fields or disrupt instruction.',
      },
      {
        question: 'Can I take photos or video?',
        answer: [
          'Personal photography and video for non-commercial use is permitted, provided you:',
          'Do not interfere with camp operations or official videographers',
          'Do not use elevated equipment (tripods, drones, or anything more than 5 feet above ground)',
        ],
      },
      {
        question: 'Is there official video for prospect events?',
        answer: 'Yes. Bulldog Lacrosse Camps partners with Next Level Video for prospect events. All games are filmed in HD from an elevated position. Contact info@nlvproductions.com with video questions.',
      },
    ],
  },
  {
    title: 'Food & Hydration',
    items: [
      {
        question: 'Should I pack lunch or snacks?',
        answer: 'Day camps: Pack snacks as desired. Check your specific session details for lunch requirements.',
      },
      {
        question: 'Is food provided?',
        answer: 'Unless otherwise noted on your session details, food is not provided. Campers should bring their own snacks and a full water bottle.',
      },
      {
        question: 'Are there water stations?',
        answer: 'Yes, water refill stations are available. However, every camper must bring their own water bottle.',
      },
      {
        question: 'What about food allergies?',
        answer: 'If your child has food allergies, pack safe snacks and ensure this information is noted on their registration form.',
      },
    ],
  },
  {
    title: 'Behavior & Conduct',
    items: [
      {
        question: 'What behavior is expected?',
        answer: 'Campers are expected to demonstrate good sportsmanship, respect coaches and fellow campers, and follow all camp rules. Bullying, fighting, or disrespectful behavior will not be tolerated.',
      },
      {
        question: 'What happens if my child misbehaves?',
        answer: 'Minor issues are addressed with the camper directly. Serious or repeated behavioral problems will result in parent notification and may result in dismissal from camp without refund.',
      },
      {
        question: 'Can my child bring a phone?',
        answer: 'We discourage phones during camp. Campers should focus on training and interacting with coaches and peers. We are not responsible for lost or damaged electronics.',
      },
    ],
  },
  {
    title: 'Scholarships & Financial Assistance',
    items: [
      {
        question: 'Do you offer scholarships?',
        answer: 'Yes. We believe every kid who wants to play should have the opportunity. Contact us at blclacrossecamps@gmail.com to inquire about financial assistance.',
      },
      {
        question: 'What is the Community Scholarship Program?',
        answer: 'When 15 or more campers register from the same town, that town\'s recreation director or youth coordinator gets to award a full scholarship to a deserving local player. It\'s their call—they pick the kid.',
      },
    ],
  },
];

export default function FAQPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-200">Everything you need to know about our camps</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqSections.map((section) => (
            <div key={section.title} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">{section.title}</h2>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.question} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-3">{item.question}</h3>
                    {Array.isArray(item.answer) ? (
                      <ul className="space-y-2 text-gray-700">
                        {item.answer.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#00356b] font-bold mr-2">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contact */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Contact</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong>{' '}
                <a href="mailto:blclacrossecamps@gmail.com" className="text-[#00356b] hover:underline">
                  blclacrossecamps@gmail.com
                </a>
              </p>
              <p className="text-gray-700">
                We&apos;re here to help. If your question isn&apos;t answered above, reach out and we&apos;ll get back to you.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-4">
              All Bulldog Lacrosse Camps are open to any and all entrants.
              Limited only by number, age, grade level and/or gender.
            </p>
            <p className="text-[#00356b] font-semibold italic">Go Bulldogs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
