import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  const bootText = [
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESSING CANDIDATE DATABASE...",
    "RETRIEVING PERSONNEL FILE: NITHIN_K",
    "VERIFYING CREDENTIALS... [OK]",
    "LOADING SKILL MATRIX... [OK]",
    "DECRYPTING EXPERIENCE LOGS...",
    "PROFILE LOADED SUCCESSFULLY.",
    "READY FOR REVIEW."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-start justify-end p-10 font-mono text-green-500 text-sm md:text-base">
      <div className="w-full max-w-2xl">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {`> ${line}`}
          </div>
        ))}
        <motion.span 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-3 h-5 bg-green-500 ml-1 align-middle"
        />
      </div>
      
      <div className="absolute top-10 right-10 text-right opacity-30">
        <div>STATUS: UNEMPLOYED</div>
        <div>TARGET: FULL-TIME ROLE</div>
        <div>SECURITY: LEVEL 5</div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
          className="h-full bg-green-500 shadow-[0_0_10px_#10b981]"
        />
      </div>
    </div>
  );
};

export default BootSequence;