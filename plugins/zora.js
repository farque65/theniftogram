import { get, includes } from 'lodash'
import path from 'path'

import { createClient } from 'urql';

const APIURL = "https://api.studio.thegraph.com/query/476/zora/v0.0.1";

const tokensQuery = `
	query {
		tokens(
		orderDirection: desc
		orderBy: createdAtTimestamp
		first: 10
		) {
		id
		contentURI
		metadataURI
		creator {
			id
		}
		}
	}
	`
const client = createClient({
	url: APIURL
});


{/* 
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
*/}

export async function ZoraFetchData() {
	const data = await client.query(tokensQuery).toPromise();
	const tokenData = await Promise.all(data.data.tokens.map(async token=> {
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
        token.link = `https://zora.co/${token.creator.id}/${token.id}`
        // console.log('view data ', token);
        return token;
      }))
	return tokenData;
}