import { GraphQLClient } from "graphql-request"
import { Error, UpdateRequest } from "types"

/* Create Client with edit permissions */
const opts = { headers: { Authorization: `Bearer ${process.env.GRAPHCMS_EDIT_TOKEN}` } }
const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT || '', opts)

const graphcms = async (query:string, args?:any) => await client.request(query, args)

export default graphcms

interface GraphCMSError {
  message: string
}
export type GraphcmsErrorResponse = {
  response : {
    errors:  Array<GraphCMSError>,
    data: any,
    extentions: {
      requestId: string
    },
    status: number,
    headers: any
  },
  request: {
    query: string,
    variables:any
  }
}

export const parseError = (err:GraphcmsErrorResponse):Error => {
  console.log(err.response.errors)
  return { 
    message: err.response.errors[0]
  }
}