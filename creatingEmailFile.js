/*
	example of file structure of fullPath got of modle:
	
[
	[
		{
			"firstname":"xxx",
			"lastname":"xxx",
			"email":"xxx@gmail.com"
		},
		{
			"firstname":"xxx",
			"lastname":"xxx",
			"email":"xxx@gmail.com"
		},
		...
	]
]
*/

import { readFile, writeFile, open} from 'fs/promises'

const getJsonFile = async (fullPath)=>{
	
	try{
		const bufferFile = await readFile(fullPath)
		const jsonFile = JSON.parse(bufferFile)
		return jsonFile
	}catch(err) {
		console.log(err)
		return 'xd'
	}
}

const getEmailFile = async (fullPath, toString=false)=>{
	const emailFile = []
	const jsonFile = await getJsonFile(fullPath)
	jsonFile[0].forEach(e=>{
		emailFile.push(e.email)
	})
	if(toString) return emailFile.toString()
	return emailFile
}

const getFullPath = (emailParams)=>{
	const {pathFile, nameFile} = emailParams	
	return pathFile + '/' + nameFile
}

const getFullNewPath = (emailParams)=>{
	const {pathNewFile, nameNewFile} = emailParams	
	return pathNewFile + '/' + nameNewFile
}

export const getEmails = async (emailParams)=>{
	const fullPath = getFullPath(emailParams)
	const fullPathNew = getFullNewPath(emailParams)
	//console.log(fullPath,fullPathNew)

	const emailFile = await getEmailFile(fullPath,true)
	
	await writeFile(fullPathNew, emailFile)	
}


export const openUwu = async (emailParams)=>{
	const fullNewPath = getFullNewPath(emailParams)
	await open(fullNewPath)
}

/*
(node:7204) Warning: Closing file descriptor 3 on garbage collection
(Use `node --trace-warnings ...` to show where the warning was created)
(node:7204) [DEP0137] DeprecationWarning: Closing a FileHandle object on garbage collection is deprecated. Please close FileHandle objects explicitly using FileHandle.prototype.close(). In the future, an error will be thrown if a file descriptor is closed during garbage collection.
*/