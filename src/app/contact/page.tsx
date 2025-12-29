'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success - in production, this would send to an API
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00356b] to-[#286dc0] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">We&apos;re here to help with any questions</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Get in Touch</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">General Inquiries</h3>
                  <p className="text-gray-700">
                    For questions about Summer Camp, Bulldog 120, Bulldog Experience, or Bulldog Clash:
                  </p>
                  <a
                    href="mailto:blclacrossecamps@gmail.com"
                    className="text-[#00356b] font-semibold hover:underline"
                  >
                    blclacrossecamps@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Bulldog Bash Tournament</h3>
                  <p className="text-gray-700">
                    For questions about the Bulldog Bash tournament, contact NXT Sports:
                  </p>
                  <a
                    href="mailto:eric.kluge@nxtsports.com"
                    className="text-[#00356b] font-semibold hover:underline"
                  >
                    eric.kluge@nxtsports.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Video Coverage</h3>
                  <p className="text-gray-700">
                    For questions about Next Level Video coverage at prospect events:
                  </p>
                  <a
                    href="mailto:info@nlvproductions.com"
                    className="text-[#00356b] font-semibold hover:underline"
                  >
                    info@nlvproductions.com
                  </a>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-2">Location</h3>
                  <p className="text-gray-700">
                    <strong>Reese Stadium</strong><br />
                    75 Central Ave<br />
                    New Haven, CT 06515
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Send a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">We&apos;ll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="">Select a topic...</option>
                      <option value="summer-camp">Summer Camp</option>
                      <option value="bulldog-120">Bulldog 120</option>
                      <option value="experience">Bulldog Experience</option>
                      <option value="clash">Bulldog Clash</option>
                      <option value="refund">Refund Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#00356b] text-white py-3 rounded-lg font-semibold hover:bg-[#286dc0] transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
