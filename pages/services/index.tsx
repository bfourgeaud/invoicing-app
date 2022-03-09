import { NextPage } from "next";
import Link from "next/link";
import useQuery from "hooks/useQuery";
import graphcms from "libs/graphcms";
import { SERVICES } from "queries";
import { Service } from "types";

interface Props {
  init: Array<Service>
}

const Services: NextPage<Props> = (props) => {
  const {data:services, isLoading, isError} = useQuery<Array<Service>>(SERVICES, "services", props.init)
  return (
    <div>
    {
      services?.map(service => (
        <Link key={service.id} href={`/services/${service.slug}`} passHref>
          <a>{service.title}</a>
        </Link>
      ))
    }
    </div>
  )
}

export async function getStaticProps<Props> () {
  const { services } = await graphcms(SERVICES)
  return {
    props: {
      init: services
    }
  }
}
export default Services;