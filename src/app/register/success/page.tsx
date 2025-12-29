'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-[#00356b] mb-4">Registration Complete!</h1>

        <p className="text-gray-600 mb-6">
          Thank you for registering for Bulldog Lacrosse Camps!
          You will receive a confirmation email shortly with all the details.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-800 mb-2">What&apos;s Next?</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Check your email for confirmation and receipt
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Review the &quot;What to Bring&quot; list in your email
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mark your calendar for camp dates
            </li>
          </ul>
        </div>

        {sessionId && (
          <p className="text-xs text-gray-400 mb-6">
            Confirmation: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-[#00356b] text-white py-3 rounded-lg font-semibold hover:bg-[#286dc0] transition"
          >
            Return Home
          </Link>
          <Link
            href="/faq"
            className="block w-full border-2 border-[#00356b] text-[#00356b] py-3 rounded-lg font-semibold hover:bg-[#00356b] hover:text-white transition"
          >
            View FAQ
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Questions? Email us at{' '}
          <a href="mailto:blclacrossecamps@gmail.com" className="text-[#00356b] hover:underline">
            blclacrossecamps@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00356b]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
