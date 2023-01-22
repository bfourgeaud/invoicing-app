import * as React from "react"
import Link from "next/link"

import { DropdownMenu } from "@/ui/dropdown"
import { Icons } from "@/components/icons"
import { Alert } from "@/ui/alert"
import { WithChildren } from "types/common"
import { Dispatch, SetStateAction } from "react"

export default function ItemOperations({ children }: WithChildren) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">
        <Icons.ellipsis className="h-4 w-4" />
        <span className="sr-only">Open</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  )
}

interface DeleteOperationProps { setShow: Dispatch<SetStateAction<boolean>> }
ItemOperations.Delete = function DeleteOperation({ setShow }:DeleteOperationProps) {
  return (
    <DropdownMenu.Item
      className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
      onSelect={() => setShow(true)}
    >
      Delete
    </DropdownMenu.Item>
  )
}

interface EditOperationProps { href: string }
ItemOperations.Edit = function EditOperation({ href }:EditOperationProps) {
  return (
    <DropdownMenu.Item>
      <Link href={href} className="flex w-full">
        Edit
      </Link>
    </DropdownMenu.Item>
  )
}

interface DeleteDialogProps {
  onDelete: () => Promise<void>
  isDeleting?: Boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title?: String
  description?: String
}
export function DeleteDialog({ onDelete, isDeleting, open, setOpen, title, description }:DeleteDialogProps) {
  return (
    <Alert open={open} onOpenChange={setOpen}>
      <Alert.Content>
        <Alert.Header>
          <Alert.Title>
            {title || "Are you sure you want to delete this item?"}
          </Alert.Title>
          <Alert.Description>{description || "This action cannot be undone."}</Alert.Description>
        </Alert.Header>
        <Alert.Footer>
          <Alert.Cancel>Cancel</Alert.Cancel>
          <Alert.Action
            onClick={onDelete}
            className="bg-red-600 focus:ring-red-600"
          >
            {isDeleting ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </Alert.Action>
        </Alert.Footer>
      </Alert.Content>
    </Alert>
  )
}