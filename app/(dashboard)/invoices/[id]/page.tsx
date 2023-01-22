import { Icons } from "@/components/icons"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { formatDate, formatInvoiceNumber } from "@/lib/utils"
import { Invoice, User } from "@prisma/client"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface InvoiceEditPageProps {
  params: { id: string }
}

async function getInvoiceForUser(invoiceId: Invoice["id"], userId: User["id"]) {
  return await db.invoice.findFirst({
    where: {
      id: invoiceId,
      userId: userId,
    }
  })
}

export default async function InvoiceEditPage({ params }: InvoiceEditPageProps) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const invoice = await getInvoiceForUser(params.id, user.id)

  if(!invoice) notFound()

  return (
    <form>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/invoices"
            className="inline-flex items-center rounded-lg border border-transparent bg-transparent py-2 pl-3 pr-5 text-sm font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-slate-700"
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
          <button
            type="submit"
            className="relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            {/*isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )*/}
            <span>Save</span>
          </button>
        </div>
        <div>
          <h1 className="text-5xl font-bold">{formatInvoiceNumber(invoice.number)}</h1>
          <p>{invoice.published ? "Publiée" : "Brouillon"}</p>
        </div>
        <div>
          <p>Crée le : {formatDate(invoice.createdAt.toDateString())}</p>
          <p>Modifiée le : {formatDate(invoice.updatedAt.toDateString())}</p>
          <p>Expire le : {formatDate(invoice.dueDate.toDateString())}</p>
          <p>{invoice.status}</p>
          <p>Client: {invoice.clientId}</p>
        </div>

        {/* ITEMS */}
        <ul className="grid gap-2 text-right">
          <li className="grid grid-cols-[3fr_1fr_1fr_1fr] py-1 font-semibold">
            <span className="text-left">Article</span>
            <span>Prix unitaire</span>
            <span>Quantité</span>
            <span>Total</span>
          </li>
          <li className="grid grid-cols-[3fr_1fr_1fr_1fr] py-1">
            <span className="text-left">
              <p>Abonnements</p>
              <div className="text-sm text-neutral-500">
                oc-lr.com, technic-conseilbyoclr.fr, oparis-sudbyoclr.com, ecip-piscinebyoclr.com, amethysbyoclr.com
              </div>
            </span>
            <span>150€</span>
            <span>3</span>
            <span>450€</span>
          </li>
          <li className="grid grid-cols-[3fr_1fr_1fr_1fr] py-1">
            <span className="text-left">
              Créations Applications
              <div className="text-sm text-neutral-500">
                Nouvelles Applications crées
              </div>
            </span>
            <span>500€</span>
            <span>2</span>
            <span>1000€</span>
          </li>
        </ul>

        {/* TOTALS */}
        <ul className="mb-2 text-md">
          <li className="flex justify-between py-1">
            <span>Sous Total</span>
            <span className="tracking-wide">1450€</span>
          </li>
          <li className="flex justify-between py-1">
            <span>Remise</span>
            <span className="tracking-wide">-50€</span>
          </li>
          <li className="flex justify-between py-1 border-t border-accent-400">
            <span className="font-semibold">Total HT</span>
            <span className="tracking-wide font-semibold">1400€</span>
          </li>
        </ul>
      </div>
    </form>
  )
}