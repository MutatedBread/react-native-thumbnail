
import { NativeModules, Platform, PermissionsAndroid } from 'react-native';

const { RNThumbnail } = NativeModules;

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
  RNThumbnail.isMoreThanKitkat
};

export default RNThumbnail;
