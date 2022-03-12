import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { serviceRepo } from "services";
import { FallbackProps, Product } from "types";
import { SWRConfig } from "swr";

interface Props extends FallbackProps<Array<Product>> { slug: string }
interface ContextQuery extends ParsedUrlQuery { slug: string }

const ServicePage: NextPage<Props> = ({ fallback, slug }) => {
  return (
    <SWRConfig value={{ fallback }}>
      {/*<Service slug={slug} />*/}
    </SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query as ContextQuery
  const service = await serviceRepo.getBySlug(slug)

  if (!service) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      fallback: {
        [`/api/services/${slug}`]: service
      },
      slug
    }
  }
}

export default ServicePage;