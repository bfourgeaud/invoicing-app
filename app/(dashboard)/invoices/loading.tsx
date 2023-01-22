import { ContentHeader } from "@/components/content-header"
import { ContentShell } from "@/components/content-shell"
import { CreateInvoiceButton } from "@/components/create-button"
import { InvoiceItem } from "@/components/invoice/invoice-item"

export default function InvoiceLoading() {
  return (
    <ContentShell>
      <ContentHeader heading="Invoices" text="Create and manage your invoices.">
        <CreateInvoiceButton disabled />
      </ContentHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <InvoiceItem.Skeleton />
        <InvoiceItem.Skeleton />
        <InvoiceItem.Skeleton />
        <InvoiceItem.Skeleton />
        <InvoiceItem.Skeleton />
      </div>
    </ContentShell>
  )
}