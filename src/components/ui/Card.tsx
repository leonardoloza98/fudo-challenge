import React from "react"

type CardProps = {
  className?: string
  children: React.ReactNode
}

export function Card({ className = "", children }: CardProps) {
  return <div className={`rounded-xl bg-white/5 shadow-lg backdrop-blur-md p-6 ${className}`}>{children}</div>
}