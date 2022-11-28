import { npm_package_version } from '$env/static/private';

export function load() {
	return {
		version: npm_package_version
	};
}
