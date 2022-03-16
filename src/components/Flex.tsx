import { mapThemeToCSSProp, styled, css } from '../../stitches.config'

export const flexStyles = css({
  display: 'flex',

  variants: {
    gap: mapThemeToCSSProp('gap'),
    gapX: mapThemeToCSSProp('columnGap'),
    gapY: mapThemeToCSSProp('rowGap'),
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
      rowReverse: { flexDirection: 'row-reverse' },
      columnReverse: { flexDirection: 'column-reverse' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
      baseline: { alignItems: 'baseline' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
    },
  },

  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
  },
})

const Flex = styled('div', flexStyles)
export default Flex
