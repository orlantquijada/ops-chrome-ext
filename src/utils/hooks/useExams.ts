import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import { Exam } from '../types'

import * as service from '../api/exams'

export const EXAMS_QUERY_KEY = 'exams'

interface ListProps {
  options?: UseQueryOptions<Exam[]>
  params?: service.ListQueryParams
}

export default function useExams({ options, params }: ListProps = {}) {
  return useQuery<Exam[]>(
    [EXAMS_QUERY_KEY, params],
    () => service.list(params),
    options
  )
}

export function useCreateExamMutation({
  options,
}: {
  options?: UseMutationOptions<
    unknown,
    unknown,
    service.CreateRequestBody,
    unknown
  >
} = {}) {
  const queryClient = useQueryClient()
  const finalOptions = options || {}

  return useMutation(
    (body: service.CreateRequestBody) => service.create(body),
    {
      ...finalOptions,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(EXAMS_QUERY_KEY)

        if (options?.onSuccess) options.onSuccess(data, variables, context)
      },
    }
  )
}

export function useExam(id: Exam['id'], options?: UseQueryOptions<Exam>) {
  return useQuery<Exam>(
    [EXAMS_QUERY_KEY, id],
    () => service.retrieve(id),
    options
  )
}
