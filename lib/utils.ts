import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatISO9075 } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("fr-FR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function toSqlDate(date: Date) {
  return formatISO9075(date)
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function formatInvoiceNumber(number: Number) {
  return `F-${number.toString().padStart(5, '0')}`
}