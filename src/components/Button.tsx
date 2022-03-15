import { css, styled } from '../../stitches.config'

export const buttonStyles = css({
  $$onPressScale: 0.98,
  background: 'none',
  border: 'none',
  fontWeight: '$bold',
  borderRadius: '$3',
  cursor: 'pointer',

  userSelect: 'none',

  // fixes <a/> button texts misaligned (uncencentered)
  display: 'grid',
  placeItems: 'center',

  transition: 'all 150ms ease',

  '&:active': {
    transform: 'scale($$onPressScale)',
  },

  variants: {
    size: {
      sm: {
        px: '1rem',
        height: '2rem',
        fontSize: '$1',
        fontWeight: '$bold',
        lineHeight: 1,
        borderRadius: '$2',
      },
      base: {
        padding: '0.5rem 1.5rem',
        fontSize: '$3',
      },
    },
    variant: {
      primary: {
        color: '$white1',
        backgroundColor: '$bloo-light-primary',

        '&:hover': {
          backgroundColor: '$bloo-dark-primary',
        },
        '&:active': {
          backgroundColor: '$bloo-light-10',
        },
        '&:focus-within': {
          outline: '2px solid $bloo-dark-30',
        },
      },
      unstyled: {
        color: '$bloo-light-primary',

        '&:hover': {
          color: '$bloo-light-10',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'unstyled',
    size: 'base',
  },
})

const Button = styled('button', buttonStyles)

export default Button
