// Countdown.js
import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { format } from 'date-fns';

const Countdown = ({ deadline, initialRemainingTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime * 60); // in seconds
  const [intervalId, setIntervalId] = useState(null);

  const updateRemainingTime = useCallback(() => {
    const currentTime = Date.now();
    const deadlineTime = new Date(deadline).getTime();
    
    // Calculate remaining time
    const totalTime = Math.max(0, Math.floor((deadlineTime - currentTime) / 1000));
    setRemainingTime(totalTime); // Seconds remaining
  }, [deadline]);

  useEffect(() => {
    updateRemainingTime(); // Initial update

    // Start the interval
    const id = setInterval(updateRemainingTime, 1000);
    setIntervalId(id);

    // Cleanup on unmount
    return () => clearInterval(id);
  }, [updateRemainingTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        const id = setInterval(updateRemainingTime, 1000);
        setIntervalId(id);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [updateRemainingTime, intervalId]);

  const totalInitialTime = initialRemainingTime * 60;
  const percentage = (remainingTime / totalInitialTime) * 100;

  // Configuration object for time intervals and colors
  const timeIntervals = [
    { maxTime: 300, color: '#f44336' }, // Red for <= 5 minutes
    { maxTime: 600, color: '#FFA500' }, // Orange for <= 10 minutes
    { maxTime: Infinity, color: '#33CC33' } // Green otherwise
  ];

  // Determine color based on remaining time
  const color = timeIntervals.find(interval => remainingTime <= interval.maxTime)?.color || '#33CC33';

  const elapsedColor = '#e0e0e0'; // Light gray for elapsed time

  // Format the remaining time as mm:ss
  const timeLeft = format(new Date(remainingTime * 1000), 'mm:ss');

  const size = 43; // Size of the circular progress bar

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      {/* Elapsed Time Progress */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={6}
        sx={{
          color: elapsedColor,
          position: 'absolute',
          zIndex: 1,
          strokeLinecap: 'round',
        }}
      />
      {/* Remaining Time Progress */}
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        thickness={6}
        sx={{
          color: color,
          position: 'absolute',
          zIndex: 2,
          strokeLinecap: 'round',
        }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: 'absolute',
          zIndex: 3,
          color: 'black',
          fontWeight: 'bold',
          fontSize: '10px', // Adjust font size for better readability
        }}
      >
        {timeLeft}
      </Typography>
    </Box>
  );
};

export default Countdown;
