import type * as Stitches from '@stitches/react'
export type { VariantProps } from '@stitches/react'

import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      // bloo light
      'bloo-light-30': '#D6F5FF',
      'bloo-light-20': '#7DD8FF',
      'bloo-light-10': '#0072B1',
      'bloo-light-primary': '#0093ED',

      'bloo-dark-30': '#00314D',
      'bloo-dark-20': '#044468',
      'bloo-dark-10': '#52C1FF',
      'bloo-dark-primary': '#03A4FF',

      //whites
      white1: '#ffffff',

      //blacks
      black1: '#000000',

      //utility colors
      error: '#ff5b5b',
      shadowLight: 'hsl(206 22% 7% / 35%)',
      shadowDark: 'hsl(206 22% 7% / 20%)',
    },
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    sizes: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    fontSizes: {
      1: '0.75rem',
      2: '0.875rem',
      3: '1rem',
      4: '1.125rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.625rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      13: '3.5rem',
      14: '4rem',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '10px',
      5: '12px',
      6: '14px',
      7: '16px',
      8: '18px',
      9: '20px',
      10: '24px',
      pill: '999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
    fonts: {
      default:
        "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    borderStyles: {},
    borderWidths: {},
    letterSpacings: {},
    lineHeights: {},
    shadows: { headerShadow: '0 0 5px rgba(0, 0, 0, 0.13)' },
    transitions: {},
  },

  utils: {
    m: (v: Stitches.PropertyValue<'margin'>) => ({ margin: v }),
    mt: (v: Stitches.PropertyValue<'margin'>) => ({ marginBlockStart: v }),
    mr: (v: Stitches.PropertyValue<'margin'>) => ({ marginInlineEnd: v }),
    mb: (v: Stitches.PropertyValue<'margin'>) => ({ marginBlockEnd: v }),
    ml: (v: Stitches.PropertyValue<'margin'>) => ({ marginInlineStart: v }),
    mx: (v: Stitches.PropertyValue<'marginInline'>) => ({ marginInline: v }),
    my: (v: Stitches.PropertyValue<'marginBlock'>) => ({ marginBlock: v }),

    p: (v: Stitches.PropertyValue<'padding'>) => ({ padding: v }),
    pt: (v: Stitches.PropertyValue<'padding'>) => ({ paddingBlockStart: v }),
    pr: (v: Stitches.PropertyValue<'padding'>) => ({ paddingInlineEnd: v }),
    pb: (v: Stitches.PropertyValue<'padding'>) => ({ paddingBlockEnd: v }),
    pl: (v: Stitches.PropertyValue<'padding'>) => ({ paddingInlineStart: v }),
    px: (v: Stitches.PropertyValue<'paddingInline'>) => ({ paddingInline: v }),
    py: (v: Stitches.PropertyValue<'paddingBlock'>) => ({ paddingBlock: v }),

    gapy: (v: Stitches.PropertyValue<'rowGap'>) => ({ rowGap: v }),
    gapx: (v: Stitches.PropertyValue<'columnGap'>) => ({ columnGap: v }),

    rt: (v: Stitches.PropertyValue<'borderRadius'>) => ({
      borderTopLeftRadius: v,
      borderTopRightRadius: v,
    }),
    rb: (v: Stitches.PropertyValue<'borderRadius'>) => ({
      borderBottomLeftRadius: v,
      borderBottomRightRadius: v,
    }),
    rl: (v: Stitches.PropertyValue<'borderRadius'>) => ({
      borderTopLeftRadius: v,
      borderBottomLeftRadius: v,
    }),
    rr: (v: Stitches.PropertyValue<'borderRadius'>) => ({
      borderTopRightRadius: v,
      borderBottomRightRadius: v,
    }),

    linearGradient: (v: Stitches.PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${v})`,
    }),
  },
})

export const globalStyles = globalCss({
  ':root': { fontSize: '16px' },
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  '*': {
    margin: 0,
  },

  'html, body': {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },

  body: {
    lineHeight: 1.5,
    '-webkit-font-smoothing': 'antialiased',
  },

  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },

  'input, button, textarea, select': {
    font: 'inherit',
  },

  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },

  a: {
    textDecoration: 'none',
  },
})

type DefaultThemeMapKeys = keyof Stitches.DefaultThemeMap
type ThemeKey<T extends DefaultThemeMapKeys> = Stitches.DefaultThemeMap[T]
type TokenKeys<T extends keyof typeof config.theme> = Exclude<
  keyof typeof config.theme[T],
  symbol
>

export type KeysToPropMap<Prop extends DefaultThemeMapKeys> = Record<
  TokenKeys<ThemeKey<Prop>>,
  Record<Prop, `$${TokenKeys<ThemeKey<Prop>>}`>
>

/**
 *
 * @param cssProp CamelCased CSS Property (color, background, fontSize)
 * @returns a record of mapped design tokens to css property with the design token's value as its value
 * @example
 * mapThemeToCSSProp('color')
 * // generates
 * {
 *    primary1: { color: '$primary1' },
 *    primary2: { color: '$primary2' },
 *    primary3: { color: '$primary3' },
 *    ...
 * }
 */
export function mapThemeToCSSProp<T extends DefaultThemeMapKeys>(cssProp: T) {
  const themeKey = config.themeMap[cssProp]
  return Object.fromEntries(
    Object.entries(theme[themeKey]).map(([key]) => [
      key,
      { [cssProp]: `$${key}` },
    ])
  ) as KeysToPropMap<T>
}
