import { gql } from "graphql-request";
import graphcms from "lib/helpers/graphcms";
import { Invoice } from "types";

const FRAGMENT = gql`
  fragment details on Invoice {
    id
    createdAt
    invoiceNumber
    paymentDue
    description
    paymentTerms
    state
    clientName
    clientEmail
    clientAddress
    senderAddress
    items
    total
  }
`

export const INVOICES = gql`
  query INVOICES {
    invoices {...details}
  }
  ${FRAGMENT}
`

export const INVOICE = gql`
  query INVOICE($id: ID!) {
    invoice(where: {id: $id}) { ...details }
  }
  ${FRAGMENT}
`

const UPDATE = gql`
  mutation UPDATE_INVOICE($id:ID!, $data:InvoiceUpdateInput!) {
    updateInvoice(where:{id:$id} data: $data) { ...details }
    updated: publishInvoice(where: {id:$id}) { ...details }
  }
  ${FRAGMENT}
`

const CREATE = gql`
  mutation CREATE_INVOICE($data:InvoiceCreateInput!, $invoiceNumber:String) {
    createInvoice(data: $data) { ...details }
    created: publishInvoice(where: {invoiceNumber:$invoiceNumber}) { ...details }
  }
  ${FRAGMENT}
`

const ARCHIVE = gql`
  mutation ARCHIVE_INVOICE($id:ID!) {
    deleted: unpublishInvoice(where: {id: $id}) { ...details }
  }
  ${FRAGMENT}
`

const getAll = async (): Promise<Array<Invoice>> => {
  const { invoices } = await graphcms(INVOICES)
  return invoices
}

const getById = async (id:string): Promise<Invoice> => {
  const { invoice } = await graphcms(INVOICE, { id })
  return invoice
}

const create = async (data:Invoice): Promise<Invoice> => {
  const { created:invoice } = await graphcms(CREATE, { data, invoiceNumber:data.invoiceNumber })
  return invoice
}

const updateById = async (id:string, data:Invoice): Promise<Invoice> => {
  const { updated:invoice } = await graphcms(UPDATE, { id, data })
  return invoice
}

const archiveById = async (id:string): Promise<Invoice> => {
  const { deleted:invoice } = await graphcms(ARCHIVE, { id })
  return invoice
}

export const invoiceService = {
  getAll,
  getById,
  create,
  updateById,
  archiveById
}