import graphcms, { GraphcmsErrorResponse, parseError } from 'lib/helpers/graphcms'
import createInvoiceNumber from 'lib/utils/createInvoiceNumber'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CREATE_INVOICE, GET_INVOICES, GET_INVOICE_NUMBERS } from 'lib/database/queries'
import { Invoice, Error } from 'types'

export default handler

function handler(req:NextApiRequest, res:NextApiResponse<Invoice | Array<Invoice> | Error>) {
    switch (req.method) {
        case 'GET':
            return get();
        case 'POST':
            return create();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function get() {
        const { invoices } = await graphcms(GET_INVOICES)
        return res.status(200).json(invoices);
    }
    
    /* ATTENTION Create InvoiceNumber */
    async function create() {
        try {
          const { invoiceNumber:inv, ...data } = req.body // Make sure invoiceNumber is set here and not client side
          const { invoices } = await graphcms(GET_INVOICE_NUMBERS)
          const invoiceNumber = createInvoiceNumber(invoices.map((i:any) => i.invoiceNumber))
          const { created:invoice } = await graphcms(CREATE_INVOICE, { data: {...data, invoiceNumber}, invoiceNumber})
          return res.status(200).json(invoice);
        } catch (error) {
          return res.status(400).json(parseError(error as GraphcmsErrorResponse));
        }
    }
}