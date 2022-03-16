import { ComponentProps, forwardRef } from 'react'
import { css, mapThemeToCSSProp, styled } from '../../stitches.config'
import { textStyles } from './Text'

export const sharedStyles = css({
  $$borderSize: '2px',

  '&:focus-visible': { outline: 'none' },
  '&::placeholder': {
    color: 'hsla(203, 100%, 46%, 0.5)',
  },

  variants: {
    color: mapThemeToCSSProp('color'),
    variant: {
      outlined: {
        border: 'none',
        boxShadow: 'inset 0 0 0 $$borderSize currentColor',
        transition: 'all 150ms ease',
      },
      unstyled: {
        border: 'none',
      },
    },
    size: {
      base: {
        height: '2.5rem',
      },
      lg: {
        height: '3rem',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'outlined',
      size: 'base',
      css: {
        borderRadius: '$3',

        'input&, & > input': {
          px: '$3',
        },
        // for right icon
        // svg: {
        //   mx: '-$2 $3',
        // },
      },
    },
    {
      variant: 'outlined',
      size: 'lg',
      css: {
        $$borderSize: '2px',
        borderRadius: '$7',

        'input&, & > input': {
          px: '$4',
        },
        // for right icon
        // svg: {
        //   mx: '-$3 $4',
        // },
      },
    },
  ],
  defaultVariants: {
    variant: 'unstyled',
    size: 'base',
  },
})

const TextField = styled('input', textStyles, sharedStyles, {
  flexGrow: 1,
  backgroundColor: 'transparent',
  fontWeight: '$medium',

  '&[type="time"]::-webkit-calendar-picker-indicator, &[type="date"]::-webkit-calendar-picker-indicator':
    {
      ml: '$1',
      filter:
        'invert(54%) sepia(47%) saturate(6519%) hue-rotate(177deg) brightness(95%) contrast(105%)',
    },
})

const StyledTextArea = styled('textarea', textStyles, sharedStyles, {
  width: '100%',
})

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof StyledTextArea>
>((props, fowardedRef) => {
  return (
    <div>
      <StyledTextArea
        {...props}
        ref={fowardedRef}
        onInput={(e) => {
          // auto resize height
          e.currentTarget.style.height = 'inherit'
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`

          if (props.onInput) props.onInput(e)
        }}
      />
    </div>
  )
})

export default TextField
