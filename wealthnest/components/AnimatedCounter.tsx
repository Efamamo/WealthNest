'use client';
import React from 'react';
import CountUp from 'react-countup';

function AnimatedCounter({ amount }: { amount: number }) {
  return (
    <div className="w-full">
      <CountUp end={amount} suffix=" Birr" decimals={2} />
    </div>
  );
}

export default AnimatedCounter;
