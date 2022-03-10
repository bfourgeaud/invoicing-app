import { NextPage } from "next";
import { serviceRepo } from "queries";
import { FallbackProps, IService } from "types";
import { SWRConfig } from "swr";
import { ServiceList } from "components";

interface Props extends FallbackProps<Array<IService>> {}

const ServicesPage: NextPage<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ServiceList />
    </SWRConfig>
  )
}

export async function getServerSideProps () {
  const services = await serviceRepo.getAll()
  return {
    props: {
      fallback: {
        '/api/services': services
      }
    }
  }
}
export default ServicesPage