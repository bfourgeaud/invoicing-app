import { NextPage } from "next";
import { serviceRepo } from "services";
import { FallbackProps, Product } from "types";
import { SWRConfig } from "swr";

interface Props extends FallbackProps<Array<Product>> {}

const ServicesPage: NextPage<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <div>Will be in fallback mode for /api/services</div>
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