import { Button as ShadcnButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Button({
  children,
  type = "button",
  bgColor,
  textColor,
  className = "",
  ...props
}) {
  let variant = "default"
  if (bgColor?.includes("red")) variant = "destructive"
  else if (bgColor?.includes("green")) variant = "secondary"

  return (
    <ShadcnButton
      type={type}
      variant={variant}
      className={cn(textColor, className)}
      {...props}
    >
      {children}
    </ShadcnButton>
  )
}

export default Button
