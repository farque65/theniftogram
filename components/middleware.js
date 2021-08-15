import { FndFetchData } from '../plugins/fnd'
import { ZoraFetchData } from '../plugins/zora'

export async function FetchData(sources) {
	if (sources == 'zora') {
		return await ZoraFetchData();
	}
	if (sources == 'fnd') {
		return await FndFetchData();
	}
}