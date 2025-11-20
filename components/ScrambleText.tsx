import React, { useEffect, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  scrambleSpeed?: number;
}

const CYBER_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>/?~010101';

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  scrambleSpeed = 30 
}) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    // Start with random length string of garbage
    setDisplayText(
      Array(text.length).fill(0).map(() => CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)]).join('')
    );

    const startScramble = () => {
      let iteration = 0;
      
      intervalId = setInterval(() => {
        setDisplayText(prev => 
          text.split('').map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          }).join('')
        );

        if (iteration >= text.length) {
          clearInterval(intervalId);
        }

        iteration += 1 / 3;
      }, scrambleSpeed);
    };

    timeoutId = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, scrambleSpeed]);

  return <span className={className}>{displayText}</span>;
};

export default ScrambleText;