import Nav from '../components/nav'
import Footer from '../components/footer'
import CardView from '../components/cardview'
import Head from 'next/head'

import { FetchData } from '../components/middleware'
import { useSource } from '../components/source'

export default function Home(props) {
  const source = useSource()

  return (
      <div className="flex flex-col h-screen">
        <Head>
          <title>Niftogram</title>
          <link rel="icon" href="/niftogramlogo.png" />
        </Head>
        <Nav />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="px-4" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                props.tokens.map((nft, i) => (
                  <CardView data={nft} index={i} source={source} key={i} />
                ))
              }
            </div>
          </div>
        </main>
        <Footer />
      </div>
  )
}

const source = 'zora';

export async function getServerSideProps() {
  const data = await FetchData(source)
  return {
    props: {
      tokens: JSON.parse(JSON.stringify(data))
    }
  }
}