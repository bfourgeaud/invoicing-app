import * as React from "react"

import { cn } from "@/lib/utils"

interface ContentShellShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ContentShell({
  children,
  className,
  ...props
}: ContentShellShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}