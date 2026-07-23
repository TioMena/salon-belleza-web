import { InputHTMLAttributes, forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, id, className = "", ...props }, ref) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 rounded-lg border ${error ? "border-red-400" : "border-border"} bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
})

Input.displayName = "Input"
export default Input
