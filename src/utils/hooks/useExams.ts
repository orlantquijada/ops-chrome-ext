import { useQuery, UseQueryOptions } from 'react-query'
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

export function useExam(id: Exam['id'], options?: UseQueryOptions<Exam>) {
  return useQuery<Exam>(
    [EXAMS_QUERY_KEY, id],
    () => service.retrieve(id),
    options
  )
}
