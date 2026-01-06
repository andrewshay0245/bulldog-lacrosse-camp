'use client';

import { useState, useRef, MouseEvent } from 'react';

interface Faceoff {
  id: string;
  x: number;
  y: number;
  winner: 'home' | 'away';
  timestamp: Date;
}

export default function FaceoffTracker() {
  const [faceoffs, setFaceoffs] = useState<Faceoff[]>([]);
  const [homeName, setHomeName] = useState('Home');
  const [awayName, setAwayName] = useState('Away');
  const svgRef = useRef<SVGSVGElement>(null);

  // Field dimensions (SVG viewBox units)
  const fieldWidth = 600;
  const fieldHeight = 400;
  const centerX = fieldWidth / 2;
  const centerY = fieldHeight / 2;
  const centerCircleRadius = 50;
  const wingLineOffset = 100;

  const handleFieldClick = (e: MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();

    // Calculate click position in SVG coordinates
    const x = ((e.clientX - rect.left) / rect.width) * fieldWidth;
    const y = ((e.clientY - rect.top) / rect.height) * fieldHeight;

    // Determine winner based on which side the ball went to
    // Left side (x < center) = Home wins, Right side = Away wins
    const winner: 'home' | 'away' = x < centerX ? 'home' : 'away';

    const newFaceoff: Faceoff = {
      id: Date.now().toString(),
      x,
      y,
      winner,
      timestamp: new Date(),
    };

    setFaceoffs([...faceoffs, newFaceoff]);
  };

  const undoLast = () => {
    setFaceoffs(faceoffs.slice(0, -1));
  };

  const clearAll = () => {
    if (faceoffs.length > 0 && confirm('Clear all faceoffs?')) {
      setFaceoffs([]);
    }
  };

  const homeWins = faceoffs.filter(f => f.winner === 'home').length;
  const awayWins = faceoffs.filter(f => f.winner === 'away').length;
  const total = faceoffs.length;
  const homePercentage = total > 0 ? Math.round((homeWins / total) * 100) : 0;
  const awayPercentage = total > 0 ? Math.round((awayWins / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#00356b] text-center mb-2">Faceoff Tracker</h1>
        <p className="text-gray-600 text-center mb-6">
          Click on the field to record where each faceoff was won
        </p>

        {/* Team Names */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <input
              type="text"
              value={homeName}
              onChange={(e) => setHomeName(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-center font-semibold w-32"
              placeholder="Home Team"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <input
              type="text"
              value={awayName}
              onChange={(e) => setAwayName(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-center font-semibold w-32"
              placeholder="Away Team"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{homeWins}</p>
              <p className="text-sm text-gray-600">{homeName}</p>
              <p className="text-xs text-gray-400">{homePercentage}%</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">Faceoffs</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{awayWins}</p>
              <p className="text-sm text-gray-600">{awayName}</p>
              <p className="text-xs text-gray-400">{awayPercentage}%</p>
            </div>
          </div>
          {/* Win percentage bar */}
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
            {total > 0 && (
              <>
                <div
                  className="bg-blue-500 transition-all duration-300"
                  style={{ width: `${homePercentage}%` }}
                />
                <div
                  className="bg-red-500 transition-all duration-300"
                  style={{ width: `${awayPercentage}%` }}
                />
              </>
            )}
          </div>
        </div>

        {/* Field Visualization */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${fieldWidth} ${fieldHeight}`}
            className="w-full h-auto cursor-crosshair"
            onClick={handleFieldClick}
            style={{ maxHeight: '60vh' }}
          >
            {/* Field Background */}
            <rect x="0" y="0" width={fieldWidth} height={fieldHeight} fill="#2d5a27" />

            {/* Field Border */}
            <rect
              x="10" y="10"
              width={fieldWidth - 20} height={fieldHeight - 20}
              fill="none"
              stroke="white"
              strokeWidth="3"
            />

            {/* Midfield Line */}
            <line
              x1={centerX}
              y1="10"
              x2={centerX}
              y2={fieldHeight - 10}
              stroke="white"
              strokeWidth="3"
            />

            {/* Center Circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={centerCircleRadius}
              fill="none"
              stroke="white"
              strokeWidth="3"
            />

            {/* Center Faceoff X */}
            <line
              x1={centerX - 8}
              y1={centerY - 8}
              x2={centerX + 8}
              y2={centerY + 8}
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1={centerX + 8}
              y1={centerY - 8}
              x2={centerX - 8}
              y2={centerY + 8}
              stroke="white"
              strokeWidth="2"
            />

            {/* Wing Lines */}
            <line
              x1={centerX - wingLineOffset}
              y1="10"
              x2={centerX - wingLineOffset}
              y2={fieldHeight - 10}
              stroke="white"
              strokeWidth="2"
              strokeDasharray="10,5"
            />
            <line
              x1={centerX + wingLineOffset}
              y1="10"
              x2={centerX + wingLineOffset}
              y2={fieldHeight - 10}
              stroke="white"
              strokeWidth="2"
              strokeDasharray="10,5"
            />

            {/* Team Labels */}
            <text x="60" y="30" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">
              {homeName}
            </text>
            <text x={fieldWidth - 60} y="30" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">
              {awayName}
            </text>

            {/* Faceoff Lines */}
            {faceoffs.map((faceoff) => (
              <g key={faceoff.id}>
                {/* Line from center to faceoff point */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={faceoff.x}
                  y2={faceoff.y}
                  stroke={faceoff.winner === 'home' ? '#3b82f6' : '#ef4444'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {/* Endpoint dot */}
                <circle
                  cx={faceoff.x}
                  cy={faceoff.y}
                  r="6"
                  fill={faceoff.winner === 'home' ? '#3b82f6' : '#ef4444'}
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
            ))}

            {/* Center dot on top */}
            <circle
              cx={centerX}
              cy={centerY}
              r="8"
              fill="white"
              stroke="#00356b"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={undoLast}
            disabled={faceoffs.length === 0}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Undo Last
          </button>
          <button
            onClick={clearAll}
            disabled={faceoffs.length === 0}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Clear All
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Click anywhere on the field to record where the faceoff was won.</p>
          <p className="mt-1">
            <span className="text-blue-600 font-semibold">Blue</span> = {homeName} wins (left side) |
            <span className="text-red-600 font-semibold ml-1">Red</span> = {awayName} wins (right side)
          </p>
        </div>
      </div>
    </div>
  );
}
