import { gql } from "graphql-request";
import graphcms from "lib/helpers/graphcms";
import { Product } from "types";

const FRAGMENT_SERVICE = gql`
  fragment ServiceDetails on Service {
    id     
    slug
    title
    price
  }
`

export const SERVICES = gql`
  query SERVICES {
    services { ...ServiceDetails }
  }
  ${FRAGMENT_SERVICE}
`

export const SERVICE = gql`
  query SERVICE($slug: String!) {
    service(where: {slug: $slug}) { ...ServiceDetails }
  }
  ${FRAGMENT_SERVICE}
`

const UPDATE_SERVICE = gql`
  mutation UPDATE_SERVICE($slug:String!, $newSlug:String! $data:ServiceUpdateInput!) {
    updateService(where:{slug:$slug} data: $data) { ...ServiceDetails }
    updated: publishService(where: {slug:$newSlug}) { ...ServiceDetails }
  }
  ${FRAGMENT_SERVICE}
`

const CREATE_SERVICE = gql`
  mutation CREATE_SERVICE($data:ServiceCreateInput!, $slug:String) {
    createService(data: $data) { ...ServiceDetails }
    created: publishService(where: {slug:$slug}) { ...ServiceDetails }
  }
  ${FRAGMENT_SERVICE}
`

const ARCHIVE_SERVICE = gql`
  mutation ARCHIVE_SERVICE($slug:String!) {
    deleted: unpublishService(where: {slug: $slug}) { ...ServiceDetails }
  }
  ${FRAGMENT_SERVICE}
`

const getAll = async (): Promise<Array<Product>> => {
  const { services } = await graphcms(SERVICES)
  return services
}

const getBySlug = async (slug:string): Promise<Product> => {
  const { service } = await graphcms(SERVICE, { slug })
  return service
}

const create = async (data:Product): Promise<Product> => {
  const { created:service } = await graphcms(CREATE_SERVICE, { data, id:data.id })
  return service
}

const updateBySlug = async (slug:string, data:Product): Promise<Product> => {
  const newSlug = data.id !== slug ? data.id : slug
  const { updated:service } = await graphcms(UPDATE_SERVICE, { slug, data, newSlug })
  return service
}

const archiveBySlug = async (slug:string): Promise<Product> => {
  const { deleted:service } = await graphcms(ARCHIVE_SERVICE, { slug })
  return service
}

export const serviceRepo = {
  getAll,
  getBySlug,
  create,
  updateBySlug,
  archiveBySlug
}