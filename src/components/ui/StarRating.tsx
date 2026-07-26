import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  max?: number
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-gold text-gold" : "text-border"}`}
        />
      ))}
    </div>
  )
}
