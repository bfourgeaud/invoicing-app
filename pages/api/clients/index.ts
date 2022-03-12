import type { NextApiRequest, NextApiResponse } from 'next'
import { clientService } from 'services'
import { Client } from 'types'

interface Error {
  message: unknown
}

export default handler

function handler(req:NextApiRequest, res:NextApiResponse<Client | Array<Client> | Error>) {
    switch (req.method) {
        case 'GET':
            return get();
        case 'POST':
            return create();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function get() {
        const clients = await clientService.getAll();
        return res.status(200).json(clients);
    }
    
    async function create() {
        try {
          const client = await clientService.create(req.body);
          return res.status(200).json(client);
        } catch (error) {
          return res.status(400).json({ message: error });
        }
    }
}