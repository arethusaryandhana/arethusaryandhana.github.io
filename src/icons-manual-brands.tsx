import type { IconProps } from "./icons-types";

export function SQLServerIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="SQL Server"
    >
      <title>SQL Server</title>
      <ellipse cx="12" cy="5" rx="6.5" ry="2.5" fill="#EEF2F6" />
      <path d="M5.5 5v8.4C5.5 14.84 8.41 16 12 16s6.5-1.16 6.5-2.6V5" fill="#D7DEE7" />
      <path d="M5.5 9.2C5.5 10.64 8.41 11.8 12 11.8s6.5-1.16 6.5-2.6" stroke="#B8C3D0" strokeWidth="1" />
      <path d="M5.5 13.3c0 1.44 2.91 2.6 6.5 2.6s6.5-1.16 6.5-2.6" stroke="#B8C3D0" strokeWidth="1" />
      <path
        d="M15.9 4.55c-1.22.24-2.57.87-3.72 1.76-1.44 1.11-2.28 2.43-2.28 3.73 0 1.16.51 2.2 1.46 3.02.82.71 1.9 1.25 3.1 1.58l.97-1.5c-.77-.2-1.45-.5-1.99-.88-.64-.47-.97-1.06-.97-1.78 0-.81.43-1.59 1.24-2.34.74-.67 1.69-1.22 2.62-1.52-.18-.68-.32-1.36-.43-2.07Z"
        fill="#E74436"
      />
      <path
        d="M16.76 5.12c.57.8 1.3 1.55 2.18 2.23-.84.33-1.67.52-2.47.58a8.71 8.71 0 0 0-2.14-1.95c.73-.41 1.55-.7 2.43-.86Z"
        fill="#C92E2B"
      />
    </svg>
  );
}

export function WebSocketIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 16l-4-4-4 4-2-2 6-6 6 6-2 2z" />
      <path d="M12 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
      <path d="M6 18h12v2H6v-2z" />
    </svg>
  );
}

export function CDCIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4V1L8 5l4 4V6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z" />
      <path d="M12 8v4l3 3-1.4 1.4L10 12V8h2z" />
    </svg>
  );
}

export function PentahoIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 3L7 3 2 12l5 9h10l5-9-5-9z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7l-3 5 3 5 3-5-3-5z" />
    </svg>
  );
}
