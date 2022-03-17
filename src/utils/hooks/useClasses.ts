import { useQuery, UseQueryOptions } from 'react-query'
import { Class } from '../types'

import * as service from '../api/classes'

export const CLASS_QUERY_KEY = 'classes'

interface Props {
  options?: UseQueryOptions<Class[]>
  params?: service.ListQueryParams
}

export default function useClasses({ options, params }: Props = {}) {
  return useQuery<Class[]>(
    [CLASS_QUERY_KEY, params],
    () => service.list(params),
    options
  )
}

export function useClass(id: Class['id'], options?: UseQueryOptions<Class>) {
  return useQuery<Class>(
    [CLASS_QUERY_KEY, id],
    () => service.retrieve(id),
    options
  )
}
