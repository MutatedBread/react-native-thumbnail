
import { NativeModules, Platform, PermissionsAndroid } from 'react-native';

export type IsMoreThanKitkatCallback = (isKitKat : boolean) => void; 

export interface Thumbnail {
	width: number,
	height: number,
	path: string,
}

export interface RNThumbnail {
	get(filePath : string): Promise<Thumbnail>;
	isMoreThanKitkat(callback : IsMoreThanKitkatCallback): void;
}

export interface PermissionHelper {
	hasPermissions() : boolean;
	requestPermissions() : boolean;
	isMoreThanKitkat: IsMoreThanKitkatCallback
}

const RNThumbnail : RNThumbnail = NativeModules.RNThumbnail;

const hasPermissionWriteExternal = async () => {
	return await PermissionsAndroid.check(
		PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
	);
};

const hasPermissionReadExternal = async () => {
	return await PermissionsAndroid.check(
		PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
	);
};

const hasPermissions = async () => {
	return (
		(await hasPermissionWriteExternal()) && (await hasPermissionReadExternal())
	);
};

const requestPermissions = async () => {
	try {
		const granted = await PermissionsAndroid.requestMultiple([
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ]);
		return Object.values(granted).every((item : string) => item === "granted");
	} catch (err) {
		return false;
	}
};

export const PermissionHelper = {
  hasPermissions,
  requestPermissions,
  isMoreThanKitkat: RNThumbnail.isMoreThanKitkat
};

export default RNThumbnail as RNThumbnail;
