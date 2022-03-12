export default function toMoney(value:number, currency?:string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currency || "EUR" }).format(value)
}