import { useQuery, UseQueryOptions } from 'react-query'
import { User } from '../types'

import * as service from '../api/users'

export const USERS_QUERY_KEY = 'users'

interface ListProps {
  options?: UseQueryOptions<User[]>
  params?: service.ListQueryParams
}

export default function useUsers({ options, params }: ListProps = {}) {
  return useQuery<User[]>(
    [USERS_QUERY_KEY, params],
    () => service.list(params),
    options
  )
}
