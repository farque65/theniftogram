import { get } from 'lodash'
import path from 'path'

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
	return get(data, 'meta.mimeType');
}