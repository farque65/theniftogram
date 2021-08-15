import { get, includes } from 'lodash'

import { createClient } from 'urql';


const APIURL = "https://api.thegraph.com/subgraphs/name/f8n/fnd";

const tokensQuery = `
query {
	nfts(
	  first: 20
	) {
	  tokenId
	  tokenIPFSPath
	  dateMinted
	  id
	  creator {
		id
	  }
  }
}
`

const client = createClient({
	url: APIURL
});

{
	/* 
		token data format  {
			__typename: 'Token',
			contentURI: '',
			id: '4514',
			metadataURI: '',
			tokenID: '4514',
			type: 'image',
			meta: {
				description: '',
				mimeType: 'image/png',
				name: 'Bored Ape Yacht Club',
				version: 'zora-20210101'
			}
		}
	*/
}

export async function FndFetchData() {
	const data = await client.query(tokensQuery).toPromise();
	const tokenData = await Promise.all(data.data.nfts.map(async token=> {
        let meta;
        try {
          const metaData = await fetch(`https://ipfs.io/ipfs/${token.tokenIPFSPath}`);
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
        if (token.type === 'image') {
          token.meta.mimeType = 'img/png';
        }
        // console.log('view data ', token);
        token.contentURI = getContentURI(meta.image);
        token.link = `https://foundation.app/${token.creator.id}/${token.id}`
        return token;
      }))
	return tokenData;
}

function getContentURI(link) {
	const linkArray = link.split('/');
	return `https://ipfs.io/ipfs/${linkArray[linkArray.length - 2]}/${linkArray[linkArray.length - 1]}`;
  }