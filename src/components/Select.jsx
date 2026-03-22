import React, { useId } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const Select = React.forwardRef(function Select(
  { options, label, className, ...props },
  ref
) {
  const id = useId()
  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={cn(
          "flex h-8 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

Select.displayName = "Select"

export default Select
