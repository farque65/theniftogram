import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

import { createClient } from 'urql';

import { get, includes } from 'lodash';
import Nav from '../components/nav'
import Footer from '../components/footer'
import CardView from '../components/cardview'
import Head from 'next/head'

export default function Home(props) {
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

let APIURL = '';
let tokensQuery = '';
let client = null;

const source = 'zora';


///////////
if (source === 'zora') {
  APIURL = "https://api.studio.thegraph.com/query/476/zora/v0.0.1";

  tokensQuery = `
    query {
        tokens(
          orderDirection: desc
          orderBy: createdAtTimestamp
          first: 30
        ) {
          id
          tokenID
          contentURI
          metadataURI
        }
    }
  `
  client = createClient({
    url: APIURL
  });

}

///////////
if (source === 'fnd') {
  APIURL = "https://api.thegraph.com/subgraphs/name/f8n/fnd";

  tokensQuery = `
    query {
      nftMarketAuctions(
        where: {status: Open, highestBid: null},
        first: 2
      ) {
      nft {
        tokenId
        tokenIPFSPath
      }
      reservePriceInETH
    }
  }
  `
  
  client = createClient({
    url: APIURL
  });
}



export async function fetchData() {
	const data = await client.query(tokensQuery).toPromise();
	let tokenData = null;

    ///ZORA
    if (source === 'zora') {
      tokenData = await Promise.all(data.data.tokens.map(async token=> {
        let meta;
        try {
          const metaData = await fetch(token.metadataURI)
          let response = await metaData.json()
          meta = response
        } catch (err) {
        }
        if (!meta) return
        const mimeType = get(meta, 'mimeType');
        if (includes(mimeType, 'mp4')) {
        token.type = 'video'
        }
        else if (includes(mimeType, 'wav')) {
        token.type = 'audio'
        }
        else {
        token.type = 'image'
        }
        token.meta = meta
        return token;
      }))
    }

    ///FND
    if (source === 'fnd') {
      tokenData = await Promise.all(data.data.nftMarketAuctions.map(async token=> {
        let meta;
        try {
          const metaData = await fetch(`https://ipfs.io/ipfs/${token.nft.tokenIPFSPath}`);
          let response = await metaData.json()
          meta = response
        } catch (err) {
          console.error('Error: ', err);
        }
        if (!meta) return
        const mimeType = get(meta, 'mimeType');
        if (includes(mimeType, 'mp4')) {
        token.type = 'video'
        }
        else if (includes(mimeType, 'wav')) {
        token.type = 'audio'
        }
        else {
        token.type = 'image'
        }
        token.meta = meta
        return token;
      }))
    }
	return tokenData;
}

export async function getServerSideProps() {
  const data = await fetchData()
  return {
    props: {
      tokens: data
    }
  }
}