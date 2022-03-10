import useQuery from "hooks/useQuery"
import Link from "next/link"
import { IService } from "types"

function ServiceList() {
  const {data:services, isLoading, isError} = useQuery<Array<IService>>('/api/services')
  return (
    <div>
      {
        services?.map(service => (
          <Link key={service.id} href={`/services/edit/${service.slug}`} passHref>
            <a>{service.title}</a>
          </Link>
        ))
      }
      <Link href={'/services/add'} passHref>
        <a>Ajouter</a>
      </Link>
    </div>
  )
}

export {ServiceList}