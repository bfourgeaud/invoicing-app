import type { NextApiRequest, NextApiResponse } from 'next'
import { clientService } from 'services';
import { Client } from 'types';

interface Error {
  message: unknown
}

export default handler;

function handler(req:NextApiRequest, res:NextApiResponse<Client | Error> ) {
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
      const client = await clientService.getById(req.query.id as string)
      return res.status(200).json({...client})
    }

    async function update() {
        try {
          const client = await clientService.updateById(req.query.id as string, req.body)
          return res.status(200).json({...client})
        } catch (error) {
          return res.status(400).json({ message: error })
        }
    }

    async function _delete() {
      const client = await clientService.archiveById(req.query.id as string)
      return res.status(200).json({...client})
    }
}