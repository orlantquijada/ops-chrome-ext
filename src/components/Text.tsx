import { mapThemeToCSSProp, styled, css } from '../../stitches.config'

export const textStyles = css({
  variants: {
    fontSize: {
      xs: { fontSize: '$1', lineHeight: '1rem' },
      sm: { fontSize: '$2', lineHeight: '1.25rem' },
      base: { fontSize: '$3', lineHeight: '1.5rem' },
      lg: { fontSize: '$4', lineHeight: '1.75rem' },
      xl: { fontSize: '$5', lineHeight: '1.75rem' },
      '2xl': { fontSize: '$6', lineHeight: '2rem' },
      '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { fontSize: '$9', lineHeight: '2.5rem' },
      '5xl': { fontSize: '$12', lineHeight: 1 },
      '6xl': { fontSize: '3.75rem', lineHeight: 1 },
      '7xl': { fontSize: '4.5rem', lineHeight: 1 },
      '8xl': { fontSize: '6rem', lineHeight: 1 },
      '9xl': { fontSize: '8rem', lineHeight: 1 },
    },
    color: mapThemeToCSSProp('color'),
    weight: mapThemeToCSSProp('fontWeight'),
  },
  defaultVariants: {
    fontSize: 'base',
  },
})

const Text = styled('span', textStyles)

export default Text
