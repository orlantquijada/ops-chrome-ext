import { styled } from '../../stitches.config'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Text from '../components/Text'

export default function EnableIncognitoScreen() {
  return (
    <Layout css={{ py: '1.5rem', px: '1.5rem' }}>
      <Header>
        <Logo />
      </Header>

      <Main>
        <Title>Welcome to OPS!</Title>
        <Text
          as="p"
          fontSize="sm"
          color="bloo-dark-primary"
          css={{ paddingBlock: '1rem' }}
        >
          It seems like you have not authorized this extension to work in
          incognito. Please follow the instructions below to allow incognito
          access.
        </Text>
        <OL>
          <LI>
            On your web browser, navigate to the <b>Extensions</b> settings page{' '}
            <u>chrome://extensions</u>.
          </LI>
          <LI>
            Find the <b>OPS</b> browser extension.
          </LI>
          <LI>
            Click on <b>Details</b>.
          </LI>
          <LI>
            Find <b> Allow in Incognito </b> option and turn it on.
          </LI>
          <LI>Reopen the browser extension.</LI>
        </OL>
      </Main>
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

const OL = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'space-between',
  gapy: '$1',
  w: '100%',
})
const LI = styled('li', {
  fontSize: '$3',
  color: '$bloo-light-primary',
})

const Title = styled('h1', {
  color: '$bloo-dark-20',
})
