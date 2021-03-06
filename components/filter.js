import Link from 'next/link'

const filters = [
	{name: 'Zora', query: 'zora' },
	{name: 'Foundation', query: 'foundation' }
]

export default function Filter() {

	return (
	<div className="mt-6 relative flex-1 px-4 sm:px-6">
		{/* Replace with your content */}
		<div className="absolute inset-0 px-4 sm:px-6">
			<div className="h-full justify-center" aria-hidden="true" >
				<div className="my-4 border-b w-full">
                    <h2 className="font-semibold text-lg text-center">Marketplaces</h2>
                </div>
					{
						filters.map((filter)=> (
							<Link key="home" href={{ 
								pathname: '/',
								query: { data: JSON.stringify(filter.query) } }}
								passHref={true}
							>
								<button
									key={filter.name}
									type="button"
									className="m-3 w-full justify-center rounded-md shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-400 hover:text-black hover:bg-yellow-500 sm:mt-0 sm:ml-3 sm:text-sm"
							>
								{filter.name}
							</button>
						  </Link>
						))
					}
			</div>
		</div>
		{/* /End replace */}
	</div>
  )
}