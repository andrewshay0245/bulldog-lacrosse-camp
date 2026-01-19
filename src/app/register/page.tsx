'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const heroImages = [
  '/images/action-1.jpg',
  '/images/action-3.jpg',
  '/images/camp-1.jpg',
  '/images/camp-2.jpg',
  '/images/camp-3.jpg',
];

const camps = [
  { id: 'summer', name: 'Summer Camp', price: 350, ages: 'Ages 7-17' },
  { id: 'bulldog-120', name: 'Bulldog 120', price: 125, ages: 'High School' },
  { id: 'experience', name: 'Bulldog Experience', price: 135, ages: 'High School' },
  { id: 'clash', name: 'Bulldog Clash', price: 350, ages: 'Class of 2028/2029' },
];

const positions = ['Attack', 'Midfield', 'Defense', 'LSM', 'Face Off', 'Goalie'];

// Camps that have position limits
const CAMPS_WITH_LIMITS = ['clash', 'bulldog-120', 'experience'];

interface PositionAvailability {
  registered: number;
  limit: number;
  available: number;
  isFull: boolean;
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const preselectedCamp = searchParams.get('camp');
  const randomImage = useMemo(() => heroImages[Math.floor(Math.random() * heroImages.length)], []);

  const [formData, setFormData] = useState({
    camperFirstName: '',
    camperLastName: '',
    dateOfBirth: '',
    graduationYear: '',
    position: '',
    school: '',
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    selectedCamp: preselectedCamp || '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [positionAvailability, setPositionAvailability] = useState<Record<string, PositionAvailability> | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const selectedCampData = camps.find(c => c.id === formData.selectedCamp);
  const campHasLimits = CAMPS_WITH_LIMITS.includes(formData.selectedCamp);

  const fetchAvailability = useCallback(async (campId: string) => {
    setLoadingAvailability(true);
    setPositionAvailability(null);
    try {
      const response = await fetch(`/api/camp-availability/${campId}`);
      const data = await response.json();
      if (data.availability) {
        setPositionAvailability(data.availability);
      }
    } catch (err) {
      console.error('Failed to fetch availability:', err);
    } finally {
      setLoadingAvailability(false);
    }
  }, []);

  useEffect(() => {
    if (preselectedCamp) {
      setFormData(prev => ({ ...prev, selectedCamp: preselectedCamp }));
    }
  }, [preselectedCamp]);

  // Fetch availability when a camp with limits is selected
  useEffect(() => {
    if (CAMPS_WITH_LIMITS.includes(formData.selectedCamp)) {
      fetchAvailability(formData.selectedCamp);
    } else {
      setPositionAvailability(null);
    }
  }, [formData.selectedCamp, fetchAvailability]);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campId: formData.selectedCamp,
          camperName: `${formData.camperFirstName} ${formData.camperLastName}`,
          camperEmail: '',
          position: formData.position,
          graduationYear: formData.graduationYear,
          school: formData.school,
          parentName: `${formData.parentFirstName} ${formData.parentLastName}`,
          parentEmail: formData.email,
          parentPhone: formData.phone,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to create checkout session');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${randomImage})` }}
      >
        <div className="absolute inset-0 bg-[#00356b]/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Register</h1>
          <p className="text-xl text-gray-200">Complete your camp registration</p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-[#00356b] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                <span className={`ml-2 hidden sm:inline ${step >= s ? 'text-[#00356b]' : 'text-gray-500'}`}>
                  {s === 1 ? 'Select Camp' : s === 2 ? 'Camper Info' : 'Payment'}
                </span>
                {s < 3 && <div className={`w-12 sm:w-24 h-1 mx-2 ${step > s ? 'bg-[#00356b]' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          {/* Step 1: Select Camp */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Select Your Camp</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {camps.map((camp) => {
                  const isLocked = preselectedCamp && preselectedCamp !== camp.id;
                  const isSelected = formData.selectedCamp === camp.id;

                  return (
                    <div
                      key={camp.id}
                      className={`border-2 rounded-xl p-6 transition ${
                        isLocked
                          ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                          : isSelected
                            ? 'border-[#00356b] bg-blue-50 cursor-pointer'
                            : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                      }`}
                      onClick={() => !isLocked && setFormData({ ...formData, selectedCamp: camp.id })}
                    >
                      <h3 className={`font-bold text-lg ${isLocked ? 'text-gray-400' : ''}`}>{camp.name}</h3>
                      <p className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>{camp.ages}</p>
                      <p className={`text-2xl font-bold mt-2 ${isLocked ? 'text-gray-400' : 'text-[#00356b]'}`}>${camp.price}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  disabled={!formData.selectedCamp}
                  onClick={() => setStep(2)}
                  className="bg-[#00356b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#286dc0] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Camper Info */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Camper Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.camperFirstName}
                        onChange={(e) => setFormData({ ...formData, camperFirstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.camperLastName}
                        onChange={(e) => setFormData({ ...formData, camperLastName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 2028"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                      {campHasLimits && loadingAvailability ? (
                        <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                          Loading availability...
                        </div>
                      ) : (
                        <select
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        >
                          <option value="">Select position...</option>
                          {positions.map((pos) => {
                            const availability = campHasLimits && positionAvailability ? positionAvailability[pos] : null;
                            const isFull = availability?.isFull ?? false;
                            const spotsLeft = availability?.available ?? null;

                            return (
                              <option key={pos} value={pos} disabled={isFull}>
                                {pos}
                                {campHasLimits && spotsLeft !== null && (
                                  isFull ? ' - SOLD OUT' : ` (${spotsLeft} spots left)`
                                )}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      {campHasLimits && positionAvailability && (
                        <p className="text-xs text-gray-500 mt-1">
                          Spots are limited. Availability updates in real-time.
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School/Club *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-[#00356b]">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.parentFirstName}
                        onChange={(e) => setFormData({ ...formData, parentFirstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.parentLastName}
                        onChange={(e) => setFormData({ ...formData, parentLastName: e.target.value })}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-[#00356b]">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Phone *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                      />
                    </div>
                  </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Conditions / Allergies
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] focus:border-transparent"
                  placeholder="Please list any medical conditions, allergies, or special needs..."
                  value={formData.medicalConditions}
                  onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                ></textarea>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[#00356b] font-semibold hover:underline"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#00356b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#286dc0] transition"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#00356b]">Payment</h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="flex justify-between items-center mb-2">
                  <span>{selectedCampData?.name}</span>
                  <span className="font-semibold">${selectedCampData?.price}.00</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>Camper: {formData.camperFirstName} {formData.camperLastName}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>Position: {formData.position}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#00356b]">${selectedCampData?.price}.00</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-sm text-green-800 font-medium">Secure Checkout</p>
                    <p className="text-sm text-green-700">
                      You&apos;ll be redirected to Stripe&apos;s secure payment page. We never see or store your card details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>Processing Fee:</strong> Only 2.9% + $0.30 per transaction (Stripe&apos;s standard rate).
                  No additional service fees!
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[#00356b] font-semibold hover:underline"
                  disabled={isLoading}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="bg-[#00356b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#286dc0] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Pay ${selectedCampData?.price}.00 →</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
