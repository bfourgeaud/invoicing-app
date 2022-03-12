import type { NextApiRequest, NextApiResponse } from 'next'
import { invoiceService } from 'services';
import { Invoice } from 'types';

interface Error {
  message: unknown
}

export default handler;

function handler(req:NextApiRequest, res:NextApiResponse<Invoice | Error> ) {
  const { id } = req.query
  if(!id) return res.status(400).json({ message: "No ID given" })

    switch (req.method) {
        case 'GET':
            return get()
        case 'PUT':
            return update()
        case 'DELETE':
            return _delete()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function get() {
      const invoice = await invoiceService.getById(req.query.id as string)
      return res.status(200).json({...invoice})
    }

    async function update() {
        try {
          const invoice = await invoiceService.updateById(req.query.id as string, req.body)
          return res.status(200).json({...invoice})
        } catch (error) {
          return res.status(400).json({ message: error })
        }
    }

    async function _delete() {
      const invoice = await invoiceService.archiveById(req.query.id as string)
      return res.status(200).json({...invoice})
    }
}