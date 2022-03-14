import { gql } from "graphql-request";

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

export const GET_INVOICES = gql`
  query INVOICES {
    invoices {...details}
  }
  ${FRAGMENT}
`

export const GET_INVOICE = gql`
  query INVOICE($id: ID!) {
    invoice(where: {id: $id}) { ...details }
  }
  ${FRAGMENT}
`

export const UPDATE_INVOICE = gql`
  mutation UPDATE_INVOICE($id:ID!, $data:InvoiceUpdateInput!) {
    updateInvoice(where:{id:$id} data: $data) { ...details }
    updated: publishInvoice(where: {id:$id}) { ...details }
  }
  ${FRAGMENT}
`

export const CREATE_INVOICE = gql`
  mutation CREATE_INVOICE($data:InvoiceCreateInput!, $invoiceNumber:String) {
    createInvoice(data: $data) { ...details }
    created: publishInvoice(where: {invoiceNumber:$invoiceNumber}) { ...details }
  }
  ${FRAGMENT}
`

export const ARCHIVE_INVOICE = gql`
  mutation ARCHIVE_INVOICE($id:ID!) {
    deleted: unpublishInvoice(where: {id: $id}) { ...details }
  }
  ${FRAGMENT}
`

export const GET_INVOICE_NUMBERS = gql`query GET_INVOICE_NUMBERS {
  invoices(stage:DRAFT) {
    invoiceNumber
  }
}`