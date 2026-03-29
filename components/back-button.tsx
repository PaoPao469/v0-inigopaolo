"use client"

import Link from "next/link"

interface BackButtonProps {
  href: string
  label?: string
}

export default function BackButton({ href, label = "Back" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
      style={{
        fontFamily: "var(--font-chillax), sans-serif",
        fontWeight: 500,
        letterSpacing: "0.12em",
        fontSize: "11px",
        color: "rgba(180, 175, 165, 0.82)",
        textTransform: "uppercase",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  )
}
