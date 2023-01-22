import { ClientItem } from "@/components/client/client-item"
import { ContentHeader } from "@/components/content-header"
import { ContentShell } from "@/components/content-shell"
import { CreateClientButton } from "@/components/create-button"

export default function ClientLoading() {
  return (
    <ContentShell>
      <ContentHeader heading="Clients" text="Create and manage your clients.">
        <CreateClientButton disabled />
      </ContentHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <ClientItem.Skeleton />
        <ClientItem.Skeleton />
        <ClientItem.Skeleton />
        <ClientItem.Skeleton />
        <ClientItem.Skeleton />
      </div>
    </ContentShell>
  )
}