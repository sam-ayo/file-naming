
import { lstatSync, readdirSync, rename } from 'fs';

function isDirectory(path: string): boolean{
    return lstatSync(`${path}`).isDirectory();
}

function hypenFileName (file: string): string{
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

function runRename(path: string){
    let files: string[] = [];
    if(isDirectory(path)){
        files = readdirSync(path);
    }
    files.forEach((file)=>{
        const filePath = `${path}/${file}`
        if(isDirectory(filePath)){
            runRename(filePath);
        }
        else{
            const newName = hypenFileName(file);
            rename(filePath, `${path}/${newName}`, error=> console.log(error))
        }
    })
}
