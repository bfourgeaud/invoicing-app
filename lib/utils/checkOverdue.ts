import isAfter from "date-fns/isAfter";
import { Invoice, ItemStatus } from "types";

export default function checkOverdue(invoice: Invoice):ItemStatus {
  if(invoice.state !== "PENDING") return invoice.state
  return isAfter(new Date(), new Date(invoice.paymentDue)) ? 'OVERDUE' : invoice.state
}