import { get, includes, isEmpty } from 'lodash'

const notAvailableMedia = [ 'video/mp4', 'audio/mpeg', 'audio/wav', 'video/quicktime', 'application/pdf' ];

function descriptionShorten(description) {
	if (!isEmpty(description)) {
		let front = description.slice(0, 20);
		if(description.length > 20) {
			front += '...';
		}
		return front;
	}
	return 'n/a';
}

export default function CardView({data, index, source}) {
	console.log('data ', data);
  return (
	<div className="container mx-auto" >
		<div className="flex flex-wrap justify-center">
			<div className="w-full sm:w-6/7 md:w-6/7 xl:w-6/7">
				<a className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
					<div className="relative pb-48 overflow-hidden">
						{
							(includes( notAvailableMedia, get(data, 'meta.mimeType')) || isEmpty(get(data, 'meta.mimeType'))) ?
							<img className="absolute inset-0 h-full w-full object-contain" src={"https://drive.google.com/uc?id=1vZMp66wQneoaX-E60yoRz6BuJsNfAKOJ"} alt=""/> :
							<img className="absolute inset-0 h-full w-full object-contain" src={data.contentURI} alt=""/>
						}
					</div>
					<div className="p-4">
						<p className="text-sm font-bold">
							{descriptionShorten(get(data, 'meta.name'))}
						</p>
						<p className="text-sm">
							{descriptionShorten(get(data, 'meta.description'))}
						</p>
						<div className="mt-3 flex items-center">
							<span className="text-sm font-semibold">
								ab
							</span>&nbsp;
							<span className="font-bold text-xl">
								45,00
							</span>&nbsp;
							<span className="text-sm font-semibold">
								$
							</span>
						</div>
					</div>
					<div className="p-4 border-t border-b text-xs text-gray-700">
						<span className="flex items-center mb-1">
							<i className="far fa-address-card fa-fw mr-2 text-gray-900">File Type:</i> {get(data, 'meta.mimeType')}
						</span>
					</div>
				</a>
			</div>
		</div>
	</div>
  )
}
