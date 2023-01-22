"use client"

import { cn, toSqlDate } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { HttpHeaders, HttpMethod } from "@/types";
import { toast } from "@/ui/toast";
import { Client, Invoice } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  outlined?: Boolean
  disabled?: Boolean
}

interface BaseCreateButtonProps<T> extends CreateButtonProps {
  onCreate: () => Promise<T & { id: String }>
  redirect: String
}

/********************************************************************************
ROOT CREATE
********************************************************************************/

export default function CreateButton<T>({ onCreate, redirect, children, outlined, disabled, className, ...props }: BaseCreateButtonProps<T>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  async function handleCreate() {
    setIsLoading(true)

    const result = await onCreate()
    if(result) {
      router.refresh()
      router.push(`${redirect}/${result.id}`)
    }

    setIsLoading(false)
  }

  return (
    <button
      onClick={() => disabled ? undefined : handleCreate()}
      className={cn(
        "relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        {
          "cursor-not-allowed opacity-60": isLoading || disabled,
        },
        {
          "border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2": outlined
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      {children}
    </button>
  )
}

/********************************************************************************
INDIVIDUAL COMPONENTS
********************************************************************************/

export const CreateClientButton = (props:CreateButtonProps) => 
  <CreateButton<Client> onCreate={createClient} redirect="/clients" {...props}>New Client</CreateButton>

export const CreateInvoiceButton = (props:CreateButtonProps) => 
  <CreateButton<Invoice> onCreate={createInvoice} redirect="/invoices" {...props}>New Invoice</CreateButton>

//export const CreateProductButton = (props:CreateButtonProps) => <CreateButton {...props}>New Product</CreateButton>


/********************************************************************************
CREATE ITEMS FUNCTIONS
********************************************************************************/

async function createInvoice() {
  const now = new Date()
  const defaultDue = new Date(now.setMonth(now.getMonth() + 1))

  const response = await fetch("/api/invoices", {
    method: HttpMethod.POST,
    headers: HttpHeaders.JSON,
    body: JSON.stringify({
      dueDate: toSqlDate(defaultDue)
    }),
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      message: "Your invoice was not created. Please try again.",
      type: "error",
    })
    return
  }

  return (await response.json()) as Invoice
}

async function createClient() {
  const response = await fetch("/api/clients", {
    method: HttpMethod.POST,
    headers: HttpHeaders.JSON,
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      message: "Your client was not created. Please try again.",
      type: "error",
    })
    return
  }

  return (await response.json()) as Client
}