// own modules
import { watchDir } from './lookingChangesDir.js'
const watchParams = {
	pathFile: 'C:/Users/DAVID/Downloads',
	nameFile: '',
	pathNewFile: 'C:/Users/DAVID/Downloads',
	nameNewFile: '',
	defaultExtensionNewFile: '.txt',
	extensionNewFile: '',
	openFile: true
}

await watchDir(watchParams)
