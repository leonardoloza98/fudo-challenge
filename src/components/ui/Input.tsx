import React from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`block w-full rounded-md border border-gray-600 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${className}`}
      {...props}
    />
  )
} 