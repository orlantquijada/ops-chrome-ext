import { styled } from '../../stitches.config'

export default function Logo() {
  return (
    <OuterLogo>
      <InnerLogo />
    </OuterLogo>
  )
}

const OuterLogo = styled('div', {
  backgroundColor: '$bloo-dark-primary',
  p: '0.75rem 1.5rem',
  borderRadius: '$3',
})

const InnerLogo = styled('div', {
  backgroundColor: '$white1',
  height: '0.5rem',
  width: '2.25rem',
  borderRadius: '$2',
})
