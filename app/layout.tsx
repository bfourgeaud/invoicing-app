import { Inter as FontSans } from "@next/font/google"
import '@/styles/globals.css'

import { cn } from "@/lib/utils"
import type { WithChildren } from '@/types'
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/ui/toast"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({ children }: WithChildren) {
  return (
    <html lang="en" className={cn("bg-white font-sans text-slate-900 antialiased", fontSans.variable)}>
      <head />
      <body className="min-h-screen">
        {children}
        <Analytics />
        <Toaster position="bottom-right" />
        <TailwindIndicator />
      </body>
    </html>
  )
}
