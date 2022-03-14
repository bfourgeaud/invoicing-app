import graphcms, { GraphcmsErrorResponse, parseError } from 'lib/helpers/graphcms';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ARCHIVE_CLIENT, GET_CLIENT, UPDATE_CLIENT } from 'lib/database/queries';
import { Client, Error } from 'types';

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
      const { client } = await graphcms(GET_CLIENT, { id:req.query.id })
      return res.status(200).json({...client})
    }

    async function update() {
        try {
          const { id, createdAt, ...rest } = req.body //Remove unwanted fields
          const { updated:client } = await graphcms(UPDATE_CLIENT, { id:req.query.id, data:rest })
          return res.status(200).json({...client})
        } catch (error) {
          return res.status(400).json(parseError(error as GraphcmsErrorResponse))
        }
    }

    async function _delete() {
      const { deleted:client } = await graphcms(ARCHIVE_CLIENT, { id: req.query.id })
      return res.status(200).json({...client})
    }
}