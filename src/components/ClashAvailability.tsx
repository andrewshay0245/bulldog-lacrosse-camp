'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PositionAvailability {
  registered: number;
  limit: number;
  available: number;
  isFull: boolean;
}

const positionOrder = ['Attack', 'Midfield', 'Defense', 'LSM', 'Face Off', 'Goalie'];

export default function ClashAvailability() {
  const [availability, setAvailability] = useState<Record<string, PositionAvailability> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await fetch('/api/camp-availability/clash');
        const data = await response.json();
        if (data.availability) {
          setAvailability(data.availability);
        }
      } catch (err) {
        console.error('Failed to fetch availability:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();
    // Refresh every 30 seconds
    const interval = setInterval(fetchAvailability, 30000);
    return () => clearInterval(interval);
  }, []);

  const allPositionsFull = availability
    ? positionOrder.every((pos) => availability[pos]?.isFull)
    : false;

  return (
    <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-[#00356b]">$350</span>
        <p className="text-gray-600">per position</p>
      </div>

      <h3 className="font-semibold mb-4">Registration by Position</h3>

      {loading ? (
        <div className="space-y-3 mb-6">
          {positionOrder.map((pos) => (
            <div key={pos} className="flex justify-between items-center animate-pulse">
              <span className="text-gray-400">{pos}</span>
              <span className="bg-gray-200 h-5 w-20 rounded"></span>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="space-y-3 mb-6">
          {positionOrder.map((pos) => (
            <div key={pos} className="flex justify-between items-center">
              <span>{pos}</span>
              <span className="font-semibold">$350</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {positionOrder.map((pos) => {
            const posData = availability?.[pos];
            const isFull = posData?.isFull ?? false;
            const spotsLeft = posData?.available ?? 0;

            return (
              <div
                key={pos}
                className={`flex justify-between items-center ${isFull ? 'text-gray-400' : ''}`}
              >
                <span>{pos}</span>
                {isFull ? (
                  <span className="font-semibold text-red-500">SOLD OUT</span>
                ) : (
                  <span className="font-semibold text-green-600">
                    {spotsLeft} spots left
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {allPositionsFull ? (
        <div className="block w-full bg-gray-400 text-white text-center py-3 rounded-lg font-semibold cursor-not-allowed">
          Fully Booked
        </div>
      ) : (
        <Link
          href="/register?camp=clash"
          className="block w-full bg-[#00356b] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#286dc0] transition"
        >
          Register Now
        </Link>
      )}

      <p className="text-sm text-gray-500 text-center mt-4">
        Questions? Email{' '}
        <a href="mailto:blclacrossecamps@gmail.com" className="text-[#00356b] hover:underline">
          blclacrossecamps@gmail.com
        </a>
      </p>
    </div>
  );
}
