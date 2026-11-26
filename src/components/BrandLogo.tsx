import { useId } from "react";

type BrandLogoProps = {
  size?: number;
  variant?: "badge" | "mark";
  className?: string;
};

/**
 * Architectural "A" monogram logo matching the Slate & Sapphire + Teal design system.
 */
export function BrandLogo({ size = 34, variant = "badge", className }: BrandLogoProps) {
  const id = useId();
  const bgId = `${id}-bg`;
  const sheenId = `${id}-sheen`;
  const borderId = `${id}-border`;
  const accentId = `${id}-accent`;
  const letterId = `${id}-letter`;

  if (variant === "mark") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="10 11 44 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={accentId} x1="25.7" y1="40" x2="41.9" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>

        <path d="M 28.4 37 H 39.2 L 41.9 43 H 25.7 Z" fill={`url(#${accentId})`} />
        <path d="M 28 13.5 H 36 L 52 49.5 H 44 L 32 22.5 L 20 49.5 H 12 Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1a33" />
          <stop offset="55%" stopColor="#0b1222" />
          <stop offset="100%" stopColor="#090e1a" />
        </linearGradient>
        <radialGradient id={sheenId} cx="18%" cy="14%" r="72%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#2dd4bf" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0b1222" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={borderId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={accentId} x1="25.7" y1="40" x2="41.9" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
        <linearGradient id={letterId} x1="32" y1="13.5" x2="32" y2="49.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dce7f7" />
        </linearGradient>
      </defs>

      <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" fill={`url(#${bgId})`} />
      <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" fill={`url(#${sheenId})`} />
      <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" fill="none" stroke={`url(#${borderId})`} strokeWidth="1.5" />

      <path d="M 28.4 37 H 39.2 L 41.9 43 H 25.7 Z" fill={`url(#${accentId})`} />
      <path d="M 28 13.5 H 36 L 52 49.5 H 44 L 32 22.5 L 20 49.5 H 12 Z" fill={`url(#${letterId})`} />
    </svg>
  );
}
