import { GraphQLClient } from "graphql-request"

/* Create Client with edit permissions */
const opts = { headers: { Authorization: `Bearer ${process.env.GRAPHCMS_EDIT_TOKEN}` } }
const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT || '', opts)

const graphcms = async (query:string, args?:any) => await client.request(query, args)
export default graphcms