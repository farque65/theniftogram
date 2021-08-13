import Nav from '../components/nav'
import Footer from '../components/footer'

const faqs = [
	{q: 'What is Crypto Currency?', a: 'Digital Currency that has its transactions recorded on a digital ledger'},
	{q: 'What is an NFT?', a: 'Non-fungible Token. It is a digital representation of a digital asset on a blockchain or digital ledger.'},
	{q: 'What is a NFT Marketplace?', a: 'A marketplace where customers can buy and sell digital assets in the form of non-fungible tokens.'},
	{q: 'How to use the site?', a: ''}
]

export default function Faq() {
  return (
	<div className="flex flex-col h-screen">
		<Nav />
		<main className="flex-1 overflow-y-auto p-5">
          <div className="px-4" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
				{
					faqs.map((faq)=> (
						<div className="flow-root text-center mx-10" key={faq.q}>
							<div className="my-4 justify-center shadow-md">
								<span className="font-bold text-xl">
									{faq.q}
								</span>
								<div className="p-4 border-t border-b text-sm text-gray-700">
									{faq.a}
								</div>
							</div>
						</div>
					))
				}
            </div>
          </div>
        </main>
		<Footer />
	</div>
  )
}