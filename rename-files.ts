
import { lstatSync, readdirSync, rename } from 'fs';

function isDirectory(path: string): boolean{
    return lstatSync(`${path}`).isDirectory();
}

function standardConvertionFileRename (file: string): string{
    let newName = "";
    for (const char of file){
        if(char === char.toUpperCase() && char !== "." && char !== "-"){
            const lowercase = char === "_" ? "" : char.toLowerCase();
            const hypenChar = `-${lowercase}`;
            newName += hypenChar;
        }else{
            newName += char;
        }
    }
    return newName;
}

function runRename(path: string, allNames: string[] = []){
    let files: string[] = [];
    if(isDirectory(path)){
        files = readdirSync(path);
    }
    files.forEach((file)=>{
        const filePath = `${path}/${file}`
        if(isDirectory(filePath)){
            runRename(filePath, allNames);
        }
        else{
            const newName = standardConvertionFileRename(file);
            rename(filePath, `${path}/${newName}`, error=> console.log(error))
            allNames.push(newName);
        }
    })
    return allNames;
}


const basePath = `${__dirname}/test`;
console.log(runRename(basePath))