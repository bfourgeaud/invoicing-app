import { gql } from "graphql-request";
import graphcms from "lib/helpers/graphcms";
import { Client } from "types";

const FRAGMENT = gql`
  fragment details on Client {
    id
    firstname
    lastname
    email
    phone
    picture {
      url
    }
    address,
    isSelf
  }
`

export const CLIENTS = gql`
  query CLIENTS {
    clients {...details}
  }
  ${FRAGMENT}
`

export const CLIENT = gql`
  query CLIENT($id: ID!) {
    client(where: {id: $id}) { ...details }
  }
  ${FRAGMENT}
`

const UPDATE = gql`
  mutation UPDATE_CLIENT($id:ID!, $data:ClientUpdateInput!) {
    updateClient(where:{id:$id} data: $data) { ...details }
    updated: publishClient(where: {id:$id}) { ...details }
  }
  ${FRAGMENT}
`

const CREATE = gql`
  mutation CREATE_CLIENT($data:ClientCreateInput!, $email:String!) {
    createClient(data: $data) { ...details }
    created: publishClient(where: {email:$email}) { ...details }
  }
  ${FRAGMENT}
`

const ARCHIVE = gql`
  mutation ARCHIVE_CLIENT($id:ID!) {
    deleted: unpublishClient(where: {id: $id}) { ...details }
  }
  ${FRAGMENT}
`

const getAll = async (): Promise<Array<Client>> => {
  const { clients } = await graphcms(CLIENTS)
  return clients
}

const getById = async (id:string): Promise<Client> => {
  const { client } = await graphcms(CLIENT, { id })
  return client
}

const create = async (data:Client): Promise<Client> => {
  const {id, picture, state, ...rest} = data
  const { created:client } = await graphcms(CREATE, { data:rest, email:rest.email })
  return client
}

const updateById = async (id:string, data:Client): Promise<Client> => {
  const { updated:client } = await graphcms(UPDATE, { id, data })
  return client
}

const archiveById = async (id:string): Promise<Client> => {
  const { deleted:client } = await graphcms(ARCHIVE, { id })
  return client
}

export const clientService = {
  getAll,
  getById,
  create,
  updateById,
  archiveById
}