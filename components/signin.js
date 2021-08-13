import { addressShorten } from './utils'

export default function Faq({ address }) {
  return (
	<div as="div" className="ml-3 relative">
		<div>
		<button className="bg-gray-800 flex text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-2 text-gray-400 hover:text-green-500">
			{address ? <p>{addressShorten(address)}</p> : <p>Sign into Metamask</p>}
		</button>
		</div>
	</div>
  )
}