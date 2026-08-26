import { useEffect, useState } from "react";

type TypewriterTextProps = {
  items: string[];
};

export function TypewriterText({ items }: TypewriterTextProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = items[lineIndex];
    const step = isDeleting ? 18 : 40;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
        return;
      }

      if (!isDeleting && displayed.length === current.length) {
        window.setTimeout(() => setIsDeleting(true), 1800);
        return;
      }

      if (isDeleting && displayed.length > 0) {
        setDisplayed(current.slice(0, displayed.length - 1));
        return;
      }

      setIsDeleting(false);
      setLineIndex((prev) => (prev + 1) % items.length);
    }, step);

    return () => window.clearTimeout(timeout);
  }, [displayed, isDeleting, items, lineIndex]);

  return (
    <div className="typewriter-line">
      <span className="typewriter-prompt">{">"}</span>
      <span>{displayed}</span>
      <span className="typewriter-cursor" />
    </div>
  );
}
