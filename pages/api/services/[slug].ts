import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceRepo } from 'queries';
import { IService } from 'types';

interface Error {
  message: unknown
}

export default handler;

function handler(req:NextApiRequest, res:NextApiResponse<IService | Error> ) {
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
      const service = await serviceRepo.getBySlug(req.query.slug as string)
      return res.status(200).json({...service})
    }

    async function update() {
        try {
          const service = await serviceRepo.updateBySlug(req.query.slug as string, req.body)
          return res.status(200).json({...service})
        } catch (error) {
          return res.status(400).json({ message: error })
        }
    }

    async function _delete() {
      const service = await serviceRepo.archiveBySlug(req.query.slug as string)
      return res.status(200).json({...service})
    }
}