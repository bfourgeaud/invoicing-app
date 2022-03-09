import { gql } from "graphql-request";

const FRAGMENT_SERVICE = gql`
  fragment ServiceDetails on Service {
    id     
    slug
    title   
  }
`

export const SERVICES = gql`
  query SERVICES {
    services {
      ...ServiceDetails
    }
  }
  ${FRAGMENT_SERVICE}
`

export const SERVICE = gql`
  query SERVICE($slug: String!) {
    service(where: { slug: $slug }) {
      ...ServiceDetails
    }
  }
  ${FRAGMENT_SERVICE}
`