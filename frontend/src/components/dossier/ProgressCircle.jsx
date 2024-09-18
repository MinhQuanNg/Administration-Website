import React from 'react';

const ProgressCircle = ({ totalParts, completedParts, pendingParts, className }) => {
  if (totalParts === 0) {
    return null;
  }

  const radius = 20; // Smaller radius for a smaller circle
  const strokeWidth = 8; // Thinner stroke width
  const circumference = 2 * Math.PI * radius;

  const completedFraction = completedParts / totalParts;
  const pendingFraction = pendingParts / totalParts;

  const completedStroke = completedFraction * circumference;
  const pendingStroke = pendingFraction * circumference;

  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className={className}>
      {/* Background circle - Slightly darker grey */}
      <circle
        cx="30"
        cy="30"
        r={radius}
        fill="none"
        stroke="#dcdcdc"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset="0"
      />
      {/* Completed tasks - Lighter gradient from green */}
      <circle
        cx="30"
        cy="30"
        r={radius}
        fill="none"
        stroke="url(#gradientCompleted)"
        strokeWidth={strokeWidth}
        strokeDasharray={`${completedStroke} ${circumference - completedStroke}`}
        strokeDashoffset="0"
        transform='rotate(-90 30 30)'
        style={{ transition: 'stroke-dasharray 0.3s ease' }}
      />
      {/* Pending tasks - Lighter gradient from orange */}
      <circle
        cx="30"
        cy="30"
        r={radius}
        fill="none"
        stroke="url(#gradientPending)"
        strokeWidth={strokeWidth}
        strokeDasharray={`${pendingStroke} ${circumference - pendingStroke}`}
        strokeDashoffset={-completedStroke}
        transform='rotate(-90 30 30)'
        style={{ transition: 'stroke-dasharray 0.3s ease' }}
      />
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradientCompleted" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#388e3c', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#81c784', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="gradientPending" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fb8c00', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ffcc80', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ProgressCircle;
