import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import useQuery from "hooks/useQuery";
import graphcms from "libs/graphcms";
import { SERVICE } from "queries";
import { Service } from "types";

interface Props {
  init: Service,
  slug: string
}

interface Context extends ParsedUrlQuery {
  slug: string
}

const Service: NextPage<Props> = (props) => {
  const {data:service, isLoading, isError} = useQuery<Service>(SERVICE, "service", props.init, { slug: props.slug })

  return (
    <div>
      <p>{service?.title}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug } = context.params as Context
  const { service } = await graphcms(SERVICE, { slug })

  if (!service) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      init: service,
      slug
    }
  }
}

export default Service;