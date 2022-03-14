import { gql } from "graphql-request";

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

export const GET_CLIENTS = gql`
  query CLIENTS {
    clients {...details}
  }
  ${FRAGMENT}
`

export const GET_CLIENT = gql`
  query CLIENT($id: ID!) {
    client(where: {id: $id}) { ...details }
  }
  ${FRAGMENT}
`

export const UPDATE_CLIENT = gql`
  mutation UPDATE_CLIENT($id:ID!, $data:ClientUpdateInput!) {
    updateClient(where:{id:$id} data: $data) { ...details }
    updated: publishClient(where: {id:$id}) { ...details }
  }
  ${FRAGMENT}
`

export const CREATE_CLIENT = gql`
  mutation CREATE_CLIENT($data:ClientCreateInput!, $email:String!) {
    createClient(data: $data) { ...details }
    created: publishClient(where: {email:$email}) { ...details }
  }
  ${FRAGMENT}
`

export const ARCHIVE_CLIENT = gql`
  mutation ARCHIVE_CLIENT($id:ID!) {
    deleted: unpublishClient(where: {id: $id}) { ...details }
  }
  ${FRAGMENT}
`