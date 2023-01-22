"use client"

import { HttpMethod } from "@/types"
import { DropdownMenu } from "@/ui/dropdown"
import { toast } from "@/ui/toast"
import { Client, Invoice } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ItemOperations, { DeleteDialog } from "./item-operations-root"

interface ItemOperationsProps<T> {
  item: Pick<T & { id: string }, "id">
}

export const InvoiceOperations = ({ item: { id } }:ItemOperationsProps<Invoice>) => {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  async function onDelete() {
    setIsDeleting(true)

    const response = await fetch(`/api/invoices/${id}`, {
      method: HttpMethod.DELETE,
    })

    if (!response?.ok) {
      toast({
        title: "Something went wrong.",
        message: "Your invoice was not deleted. Please try again.",
        type: "error",
      })
    }

    setIsDeleting(false)
    setShowDeleteAlert(false)
    router.refresh()
  }

  return (
    <>
      <ItemOperations>
        <ItemOperations.Edit href={`/invoices/${id}`} />
        <DropdownMenu.Separator />
        <ItemOperations.Delete setShow={setShowDeleteAlert} />
      </ItemOperations>
  
      <DeleteDialog onDelete={onDelete} isDeleting={isDeleting} open={showDeleteAlert} setOpen={setShowDeleteAlert} />
    </>
  )
}

export const ClientOperations = ({ item: { id } }:ItemOperationsProps<Client>) => {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  async function onDelete() {
    setIsDeleting(true)

    const response = await fetch(`/api/clients/${id}`, {
      method: HttpMethod.DELETE,
    })

    if (!response?.ok) {
      toast({
        title: "Something went wrong.",
        message: "The client was not deleted. Please try again.",
        type: "error",
      })
    }

    setIsDeleting(false)
    setShowDeleteAlert(false)
    router.refresh()
  }

  return (
    <>
      <ItemOperations>
        <ItemOperations.Edit href={`/clients/${id}`} />
        <DropdownMenu.Separator />
        <ItemOperations.Delete setShow={setShowDeleteAlert} />
      </ItemOperations>
  
      <DeleteDialog onDelete={onDelete} isDeleting={isDeleting} open={showDeleteAlert} setOpen={setShowDeleteAlert} />
    </>
  )
}