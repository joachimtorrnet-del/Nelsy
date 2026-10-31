import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface Props {
  words: string[];
  interval?: number;
  className?: string;
  /** Styles applied directly to the animated motion.span (e.g. gradient-text treatment) */
  motionStyle?: CSSProperties;
}

export default function RotatingWord({ words, interval = 2000, className = '', motionStyle }: Props) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-flex justify-center w-full" aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className={`inline-block whitespace-nowrap ${className}`}
          style={motionStyle}
          initial={reduce ? { opacity: 0 } : { y: 24, opacity: 0, filter: 'blur(8px)' }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0, 0, 0.2, 1] } }}
          exit={reduce ? { opacity: 0 } : { y: -24, opacity: 0, filter: 'blur(8px)', transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
