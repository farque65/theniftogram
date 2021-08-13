import { get } from 'lodash'

export function getImage(data) {
	return get(data, 'meta.image');
}

export function getName(data) {
	return get(data, 'meta.name');
}

export function getDescription(data) {
	return get(data, 'meta.description');
}

export function getFileType(data) {
	const url = get(data, 'meta.image');
	const baseName = url.split('/', -1)[-1];
	return baseName.split('.', -1)[-1];
}