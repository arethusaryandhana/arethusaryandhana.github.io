import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { bootLines } from "../../content/site";

type BootSequenceProps = {
  onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    const timers: number[] = [];
    const lastDelay = bootLines[bootLines.length - 1]?.delay ?? 0;

    bootLines.forEach((line, index) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleLines(index + 1);
          setProgress(Math.round(((index + 1) / bootLines.length) * 100));
        }, line.delay)
      );
    });

    timers.push(window.setTimeout(onComplete, lastDelay + 750));

    return () => timers.forEach(clearTimeout);
  }, [onComplete, reduced]);

  return (
    <motion.div className="boot-screen" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div className="boot-content">
        {bootLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            className="boot-line"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12 }}
          >
            {line.text.includes("[OK]") ? (
              <>
                {line.text.replace("[OK]", "")}
                <span className="boot-ok">[OK]</span>
              </>
            ) : line.text.includes("✓") ? (
              <span className="boot-check">{line.text}</span>
            ) : (
              line.text
            )}
          </motion.div>
        ))}

        <div className="boot-progress">
          <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="boot-percent">
          {progress}% — {progress < 100 ? "Loading..." : "Ready"}
        </div>
      </div>
    </motion.div>
  );
}
