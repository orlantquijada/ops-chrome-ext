import { Class, Exam } from '../utils/types'
import Box from './Box'
import Text from './Text'

export default function ClassCard({ classData }: { classData: Class }) {
  return (
    <Box
      css={{
        backgroundColor: '$bloo-light-30',
        p: '1rem',
        w: '100%',
        borderRadius: '5px',
      }}
    >
      <Text color="bloo-light-primary" weight="semibold" fontSize="lg">
        {classData.courseCode} - {classData.section}
      </Text>
    </Box>
  )
}
