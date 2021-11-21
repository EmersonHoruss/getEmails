// node modules
import { readdir } from 'fs/promises'
import { watch } from 'fs';

// foreun modules

// own modules
import { getEmails, openUwu} from './creatingEmailFile.js'

// definition variables
const patternJSON = /.json/

// definition function
const isJSON = (fileName)=>{
	return patternJSON.test(fileName)
}

const getJsonArray = (dir)=>{
	return dir.filter(fileName=>isJSON(fileName))
}

const getJsonDir = async(dirName)=>{
	const dir = await readdir(dirName)
	return getJsonArray(dir)
}

const existOneFile = (dirJson, fileName)=>{
	const filtered = dirJson.filter(e=>e===fileName)
	return filtered.length === 1
}

const changingExtension = (fileName, extensionToChange='')=>{
	return fileName.replace(patternJSON, extensionToChange)
}

const creatingNameFile = (fileName,watchParams)=>{
	let {nameNewFile, defaultExtensionNewFile, extensionNewFile} = watchParams
	
	extensionNewFile = extensionNewFile ? extensionNewFile : defaultExtensionNewFile

	nameNewFile = nameNewFile ? nameNewFile : changingExtension(fileName,extensionNewFile)
	
	const clonedWatchParams = JSON.parse(JSON.stringify(watchParams))
	clonedWatchParams.nameNewFile = nameNewFile
	clonedWatchParams.extensionNewFile = extensionNewFile
	clonedWatchParams.nameFile = fileName
	return clonedWatchParams
}


export const watchDir = async(watchParams)=>{
	const {pathFile:dirName} = watchParams
	const filesJson = await getJsonDir(dirName)

	watch(dirName, async(eventType, fileName)=>{
		const fileNameIsJson = isJSON(fileName)
		if(fileNameIsJson){	
			const exist = existOneFile(filesJson, fileName)
			//console.log(exist)
			if(!exist) {
				filesJson.push(fileName)
				//create and open file with just emails
				const emailParamsSend = creatingNameFile(fileName,watchParams)
				await getEmails(emailParamsSend)
				await openUwu(emailParamsSend)
				//console.log(emailParamsSend)
			}
		}
	})
}