const filters = [
	{name: 'Zora', link: ''},
	{name: 'Rarible', link: ''},
	{name: 'Open Sea', link: ''}
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
							<button
								type="button"
								className="m-3 w-full justify-center rounded-md shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-400 hover:text-black hover:bg-yellow-500 sm:mt-0 sm:ml-3 sm:text-sm"
								// onClick={closesignonmodal}
								// ref={cancelButtonRef}
						  >
							{filter.name}
						  </button>
						))
					}
			</div>
		</div>
		{/* /End replace */}
	</div>
  )
}