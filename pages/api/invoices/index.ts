import type { NextApiRequest, NextApiResponse } from 'next'
import { invoiceService } from 'services'
import { Invoice } from 'types'

interface Error {
  message: unknown
}

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
        const invoices = await invoiceService.getAll();
        return res.status(200).json(invoices);
    }
    
    async function create() {
        try {
          const invoice = await invoiceService.create(req.body);
          return res.status(200).json(invoice);
        } catch (error) {
          return res.status(400).json({ message: error });
        }
    }
}