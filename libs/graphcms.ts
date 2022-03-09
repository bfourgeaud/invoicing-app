import { GraphQLClient } from "graphql-request"
const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || '')

const graphcms = async (query:string, args?:any) => await client.request(query, args)
export default graphcms