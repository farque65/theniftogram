import { get, includes, isEmpty } from 'lodash'
import Image from 'next/image'

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

function toAscii(src) {
    var ch, str, i, result = '';
        
    // `str` should now be 'double-escaped' e.g. a newline in the
    //  original `src` should be represented by '\\n' in `str`
    str = JSON.stringify(src);
	if (isEmpty(str)) {
		return result;
	}

    // we start from str[1] and stop at str[-1] to
    // drop the opening and closing quote marks when
    // using JSON.stringify
    for (i = 1; i < str.length - 1; i++) {
        // May need to use a "fixed" version
        // of charCodeAt as discussed here
        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/charCodeAt 
        ch = str.charCodeAt(i);  

        if (ch < 128) {
            result += str.charAt(i);
        } else {
            result += '\\u' + ch.toString(16);
        }
    }
	return result;
}

export default function CardView({data, index, source}) {
  return (
	<div className="container mx-auto" key={`${get(data, 'meta.name')}_${get(data, 'meta.mimeType')}`}>
		<div className="flex flex-wrap justify-center">
			<div className="w-full sm:w-6/7 md:w-6/7 xl:w-6/7">
				<a className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
					<div className="relative pb-48 overflow-hidden" key={get(data, 'meta.name')}>
						{
							(includes( notAvailableMedia, get(data, 'meta.mimeType')) || isEmpty(get(data, 'meta.mimeType'))) ?
							<Image className="absolute inset-0 h-full w-full object-contain" src={"https://drive.google.com/uc?id=1vZMp66wQneoaX-E60yoRz6BuJsNfAKOJ"} alt="" layout="fill"/> :
							<Image className="absolute inset-0 h-full w-full object-contain" src={data.contentURI} alt="" layout="fill"/>
						}
					</div>
					<div className="p-4">
						<p className="text-sm font-bold">
							{descriptionShorten(get(data, 'meta.name'))}
						</p>
						<p className="text-sm">
							{descriptionShorten(toAscii(get(data, 'meta.description')))}
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
