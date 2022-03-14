import graphcms, { GraphcmsErrorResponse, parseError } from 'lib/helpers/graphcms';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ARCHIVE_INVOICE, GET_INVOICE, UPDATE_INVOICE } from 'lib/database/queries';
import { Invoice, Error } from 'types';

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
      const { invoice } = await graphcms(GET_INVOICE, { id:req.query.id })
      return res.status(200).json({...invoice})
    }

    async function update() {
        try {
          const { id, createdAt, ...rest } = req.body //Remove unwanted fields
          const { updated:invoice } = await graphcms(UPDATE_INVOICE, { id:req.query.id, data:rest })
          return res.status(200).json({...invoice})
        } catch (error) {
          return res.status(400).json(parseError(error as GraphcmsErrorResponse))
        }
    }

    async function _delete() {
      const { deleted:invoice } = await graphcms(ARCHIVE_INVOICE, { id: req.query.id })
      return res.status(200).json({...invoice})
    }
}