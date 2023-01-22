import { Invoice } from "@prisma/client"
import Link from "next/link"

import { formatDate, formatInvoiceNumber } from "@/lib/utils"
import { Skeleton } from "@/ui/skeleton"
import { InvoiceOperations } from "../item-operations"

interface InvoiceItemProps {
  invoice: Pick<Invoice, "id" | "number" | "published" | "createdAt">
}

export function InvoiceItem({ invoice }: InvoiceItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/invoices/${invoice.id}`}
          className="font-semibold hover:underline"
        >
          {formatInvoiceNumber(invoice.number)}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(invoice.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <InvoiceOperations item={{ id: invoice.id }} />
    </div>
  )
}

InvoiceItem.Skeleton = function InvoiceItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}