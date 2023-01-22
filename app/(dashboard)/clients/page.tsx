import { ContentHeader } from "@/components/content-header"
import { ContentShell } from "@/components/content-shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { cache } from "react"
import { User } from "@prisma/client"
import { db } from "@/lib/db"
import { ClientItem } from "@/components/client/client-item"
import { CreateClientButton } from "@/components/create-button"

const getClientsForUser = cache(async (userId: User["id"]) => {
  return await db.client.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      isCompany: true,
      companyName: true,
      firstname: true,
      lastname: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

export default async function ClientPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const clients = await getClientsForUser(user.id)

  return (
    <ContentShell>
      <ContentHeader heading="Clients" text="Create and manage your clients.">
        <CreateClientButton />
      </ContentHeader>
      <div>
        {clients?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {clients.map((client) => (
              <ClientItem key={client.id} client={client} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="company" />
            <EmptyPlaceholder.Title>No clients created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any clients yet. Start creating some.
            </EmptyPlaceholder.Description>
            <CreateClientButton outlined />
          </EmptyPlaceholder>
        )}
      </div>
    </ContentShell>
  )
}