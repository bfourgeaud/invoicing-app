import { Client } from "@prisma/client"
import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/ui/skeleton"
import { ClientOperations } from "../item-operations"

interface ClientItemProps {
  client: Pick<Client, "id" | "isCompany" | "companyName" | "firstname" | "lastname" | "createdAt">
}

export function ClientItem({ client }: ClientItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/clients/${client.id}`}
          className="font-semibold hover:underline"
        >
          {client.isCompany ? client.companyName : `${client.firstname} ${client.lastname}`}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(client.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <ClientOperations item={{ id: client.id }} />
    </div>
  )
}

ClientItem.Skeleton = function ClientItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}