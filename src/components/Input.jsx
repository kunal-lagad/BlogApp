import React, { useId } from "react"
import { Input as InputPrimitive } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId()
  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputPrimitive type={type} ref={ref} {...props} id={id} />
    </div>
  )
})

Input.displayName = "Input"

export default Input
