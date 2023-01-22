import { ContentHeader } from "@/components/content-header"
import { ContentShell } from "@/components/content-shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { cache } from "react"
import { User } from "@prisma/client"
import { db } from "@/lib/db"
import { InvoiceItem } from "@/components/invoice/invoice-item"
import { CreateInvoiceButton } from "@/components/create-button"

const getInvoicesForUser = cache(async (userId: User["id"]) => {
  return await db.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      number: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const invoices = await getInvoicesForUser(user.id)

  return (
    <ContentShell>
      <ContentHeader heading="Invoices" text="Create and manage your invoices.">
        <CreateInvoiceButton />
      </ContentHeader>
      <div>
        {invoices?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {invoices.map((invoice) => (
              <InvoiceItem key={invoice.id} invoice={invoice} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No invoices created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any invoices yet. Start creating content.
            </EmptyPlaceholder.Description>
            <CreateInvoiceButton outlined/>
          </EmptyPlaceholder>
        )}
      </div>
    </ContentShell>
  )
}