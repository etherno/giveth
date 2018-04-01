import Head from 'next/head'
import styled from 'styled-components'

const Title = styled.h1`
  margin: 0;
`

export default () =>
  <div>
    <Head>
      <title>Giveth - Wall of Fame</title>
    </Head>
    <Title>My page</Title>
  </div>
