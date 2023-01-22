import fs from 'fs';
import path from 'path';
import minify from 'uglify-js-minify-css-allfiles';
import jobf from 'javascript-obfuscator';
import { dir } from 'console';

type targetType = 'node' | 'browser' | 'browser-no-eval'
const defaultMinifyOptions = (obfuscateTargetType: targetType) => {
    return {
        compact: true,
        simplify: true,
        stringArray: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayThreshold: 0.75,
        stringArrayIndexShift: true,
        stringArrayIndexesType: ['hexadecimal-number'],
        stringArrayWrappersCount: 1,
        stringArrayWrappersType: 'variable',
        stringArrayWrappersChainedCalls: true,
        target: obfuscateTargetType,
        seed: 0,
        deadCodeInjection: false,
    }
};

class OBFMC {
    silentLog: boolean = false;
    /**
     * This function will obfuscate your files that ends with a specific extension in a directory
     * @param {string} fileExtension - fileExtension: as long as it ends with js, mjs or jsx it will work
     * @param {string} dirPath - dirPath: the path to the directory of the files that you want to be obfuscated
     * @param {targetType} obfuscateTargetType - obfuscateTargetType: you need to specifiy the obfuscate target type in-order to work properly
     * @param {{ }} obfuscateOptions - obfuscateOptions: you can change here the obfuscate options, There are default ones you don't need to use this argument if you are lazy to include them, Otherwise lookat https://obfuscator.io/
    */
    obfuscate = async (fileExtension: string, dirPath: string, obfuscateTargetType: targetType, obfuscateOptions: jobf.ObfuscatorOptions | { } = defaultMinifyOptions(obfuscateTargetType)) => {
        new Promise<void>((resolve, reject) => {
            try {
                const ext: string = '.' + fileExtension; 
                const directory   = fs.readdirSync(path.join(dirPath)).filter((e: string) => e.endsWith(ext));
                
                directory.map(async (file: string) => {
                    const fileName   : string = file.toString();
                    const filePath   : string = path.join(dirPath, fileName);
                    const readFile            = fs.readFileSync(filePath);
                    const fileContent: string = readFile.toString();
                
                    // Obfuscate the file content
                    const obfuscatedFile = jobf.obfuscate(
                        fileContent,
                        obfuscateOptions
                    );
                
                    // Format the file
                    fs.writeFileSync(filePath, '');
                
                    // Get the obfuscated file content
                    const obfuscatedFileContent = obfuscatedFile.getObfuscatedCode();
                
                    // Replace the file with the new code
                    fs.writeFile(filePath, obfuscatedFileContent, (err) => {
                        if(err) return console.log(err);
                        if(!this.silentLog) console.log(`/${fileName} was formatted and obfuscated successfully!`);
                    });
                });
                if(!this.silentLog) console.log(`Finished ${directory.toString()}!`);

                resolve();
            } catch(error) {
                reject(error);
            }
        })
    }

    /**
     * This function will minify your files in a directory
     * THIS FUNCTION WILL WORK MORE EFFICIENTLY IF THE FILES IN THE DIRECTORY ENDS WITH (js, css, html)
     * ALOT OF THANKS TO @oinochoe FOR DOING uglify-js-minify-css-allfiles, Take a look on it at https://github.com/oinochoe/uglify-js-minify-css-allfiles
     * ALTHOUGH IT WORKS PERFECTLY, SILENTLOG WON'T WORK WITH IT
     * @param {string} dirPath - dirPath: the path to the directory of the files that you want to be minified.
    */
    minifyDir = async (dirPath: string) => {
        new Promise<void>((resolve, reject) => {
            try {
                minify(path.join(dirPath))
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    obfminMix = async (fileExtension: string, dirPath: string, obfuscateTargetType: targetType, obfuscateOptions: { } = defaultMinifyOptions(obfuscateTargetType)) => {
        new Promise<void>((resolve, reject) => {
            try {
                this.obfuscate(fileExtension, dirPath, obfuscateTargetType, obfuscateOptions);
                this.minifyDir(dirPath);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }
}

export {
    OBFMC
}