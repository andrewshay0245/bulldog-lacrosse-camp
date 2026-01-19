'use client';

import { useState } from 'react';

export default function LessonsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    experience: '',
    position: '',
    hoursPerWeek: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <section
          className="relative bg-cover bg-center py-20"
          style={{ backgroundImage: 'url(/images/training-1.jpg)' }}
        >
          <div className="absolute inset-0 bg-[#00356b]/80"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Private Lessons</h1>
            <p className="text-xl text-gray-200">Individual instruction from our network of coaches and players</p>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-green-50 border border-green-200 rounded-xl p-8">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Request Submitted!</h2>
              <p className="text-green-700">
                Thank you for your interest in private lessons. A staff member will be in touch soon to discuss availability and options.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/training-1.jpg)' }}
      >
        <div className="absolute inset-0 bg-[#00356b]/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Private Lessons</h1>
          <p className="text-xl text-gray-200">Individual instruction from our network of coaches and players</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">About Our Lessons</h2>
              <p className="text-gray-700 mb-6">
                We have a network of experienced coaches and current/former players available for individual lessons.
                Whether you&apos;re looking to improve your stick skills, shooting, defense, or goalie techniques,
                we can connect you with the right instructor.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-amber-800 mb-2">Availability Notice</h3>
                <p className="text-amber-700 text-sm">
                  Lesson availability is contingent on the time of year. <strong>Spring is more difficult,
                  and sometimes impossible</strong>, due to the competitive season. Fall and summer typically
                  offer the best availability.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-2">What to Expect</h3>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• Fill out the form with your information</li>
                  <li>• A staff member will reach out to discuss options</li>
                  <li>• We&apos;ll match you with an appropriate instructor</li>
                  <li>• Schedule lessons at a mutually convenient time</li>
                </ul>
              </div>

              <p className="text-gray-500 text-sm mt-6">
                <strong>Note:</strong> Goalie instruction is available for all genders.
              </p>
            </div>

            {/* Form Section */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Request Information</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Player Age *</label>
                      <input
                        type="number"
                        required
                        min="5"
                        max="25"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      >
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level *</label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    >
                      <option value="">Select...</option>
                      <option value="Beginner">Beginner (0-1 years)</option>
                      <option value="Intermediate">Intermediate (2-4 years)</option>
                      <option value="Advanced">Advanced (5+ years)</option>
                      <option value="Elite">Elite (Varsity/Club)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position/Focus Area</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    >
                      <option value="">Select...</option>
                      <option value="Attack">Attack</option>
                      <option value="Midfield">Midfield</option>
                      <option value="Defense">Defense</option>
                      <option value="Goalie">Goalie</option>
                      <option value="Face Off">Face Off</option>
                      <option value="General Skills">General Skills</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hours Per Week Interested *</label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      value={formData.hoursPerWeek}
                      onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3-4">3-4 hours</option>
                      <option value="5+">5+ hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                      placeholder="Any specific goals, preferred times, or other details..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00356b] text-white py-3 rounded-lg font-semibold hover:bg-[#286dc0] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    A staff member will contact you to discuss availability and pricing.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
