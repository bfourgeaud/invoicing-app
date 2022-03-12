import format from "date-fns/format"

export default function createInvoiceNumber (ids:Array<string> = []):string {
  const dateStr = format(new Date(), 'yyyyMM')

  const monthIds = ids?.filter(i => i.startsWith(`F${dateStr}`)).map(i => parseInt(i.substring(7,10)))
  const next = !monthIds.length ? 1 : Math.max(...monthIds) + 1
  const nextStr = String(next).padStart(3, '0')
  let ID = `F${dateStr}${nextStr}`
  return ID
}