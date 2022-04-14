import { styled } from '../../stitches.config'
import Layout from '../components/Layout'
import Logo from '../components/Logo'

export default function EnableIncognitoScreen() {
  return (
    <Layout css={{ py: '1.5rem', px: '1.5rem' }}>
      <Header>
        <Logo />
      </Header>

      <Main>please enable incognito</Main>
    </Layout>
  )
}

const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  w: '100%',
})

const Main = styled('main', {
  mt: '$5',
})
