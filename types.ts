export type ToggleHandlers = {
  on: () => void;
  off: () => void;
  toggle: () => void;
};

export type ScreenType = "phone" | "tablet" | "desktop";

export type ModuleDef = {
  label: string,
  icon: string,
  link: string,
  disabled?: boolean
}

export type Filters = {
  [key: string] : FilterType
}

export type FilterType = {
  name: string,
  label: string,
  value: boolean;
  onChange: () => void;
};

export type ClientState = 'ERROR' | "WARNING" | "OK"
export interface Client {
  id?: string,
  firstname?: string,
  lastname?:string
  email: string,
  phone?:string,
  picture?: {
    url:string
  },
  address?: Address,
  isSelf?: boolean,
  state?: ClientState,
}

export type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type ItemStatus = "DRAFT" | "PENDING" | "PAID" | "OVERDUE";

export interface Invoice {
  id?: string;
  createdAt?: string;
  invoiceNumber?: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  state: ItemStatus;
  clientName: string;
  clientEmail: string;
  senderAddress: Address;
  clientAddress:Address;
  items: Item[];
  total: number;
}

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Product {
  id: string,
  name: string,
  description?: string,
  price: number
}

export type InvoiceKey = keyof Invoice;

export interface FallbackProps<T> {
  fallback: {
    [key:string]: Array<T>
  }
}

export type GET = <T>(url:string) => Promise<Required<T>>
export type POST = <T>(url:string, body:Partial<T>) => Promise<Required<T>>
export type PUT = <T>(url:string, body:Partial<T>) => Promise<Required<T>>
export type DELETE = <T>(url:string) => Promise<Required<T>>