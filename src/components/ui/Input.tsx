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
        className={`w-full px-4 py-2.5 rounded-xl border ${error ? "border-error" : "border-border"} bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-error text-xs">{error}</p>}
    </div>
  )
})

Input.displayName = "Input"
export default Input
