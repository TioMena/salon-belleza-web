import { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export default function Card({ hover = true, children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-xl border border-border ${hover ? "hover:shadow-lg hover:-translate-y-1" : ""} transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
