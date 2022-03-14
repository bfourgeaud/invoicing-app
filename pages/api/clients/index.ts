import graphcms, { parseError, GraphcmsErrorResponse } from 'lib/helpers/graphcms'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CREATE_CLIENT, GET_CLIENTS } from 'lib/database/queries'
import { Client, Error } from 'types'

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
      const { clients } = await graphcms(GET_CLIENTS)
        return res.status(200).json(clients);
    }
    
    async function create() {
        try {
          const { email } = req.body
          const { created:client } = await graphcms(CREATE_CLIENT, { data:req.body, email })
          return res.status(200).json(client);
        } catch (error) {
          return res.status(400).json(parseError(error as GraphcmsErrorResponse));
        }
    }
}