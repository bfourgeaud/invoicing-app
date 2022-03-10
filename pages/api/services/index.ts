import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceRepo } from 'queries'
import { IService } from 'types'

interface Error {
  message: unknown
}

export default handler

function handler(req:NextApiRequest, res:NextApiResponse<IService | Array<IService> | Error>) {
    switch (req.method) {
        case 'GET':
            return get();
        case 'POST':
            return create();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function get() {
        const services = await serviceRepo.getAll();
        return res.status(200).json(services);
    }
    
    async function create() {
        try {
          const service = await serviceRepo.create(req.body);
          return res.status(200).json(service);
        } catch (error) {
          return res.status(400).json({ message: error });
        }
    }
}