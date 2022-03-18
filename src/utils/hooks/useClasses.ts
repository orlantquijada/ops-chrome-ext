import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
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

export function useEnrolMutation({
  options,
}: {
  options?: UseMutationOptions<
    unknown,
    unknown,
    service.EnrolRequestBody,
    unknown
  >
} = {}) {
  const queryClient = useQueryClient()
  const finalOptions = options || {}

  return useMutation((body: service.EnrolRequestBody) => service.enrol(body), {
    ...finalOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(CLASS_QUERY_KEY)

      if (options?.onSuccess) options.onSuccess(data, variables, context)
    },
  })
}
