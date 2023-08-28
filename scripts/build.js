const { readdirSync } = require('fs');
const { join, relative } = require('path');
const { writeFileSync } = require('fs');
const pkg = require('../package.json');


/**
 * @type {{
 *   $schema: "https://json.schemastore.org/chrome-manifest";
 *   manifest_version: number;
 *   name: string;
 *   description: string;
 *   version: string;
 *   content_scripts: {
 *       js: string[];
 *       matches: string[];
 *   }[];
 *   background: {
 *       scripts: string[];
 *   };
 * }}
 */
const manifest = {
    "$schema": "https://json.schemastore.org/chrome-manifest",
    "manifest_version": 2,
    "name": pkg.name,
    "description": pkg.description,
    "version": pkg.version,
    "permissions": [
        "clipboardRead",
        "clipboardWrite"
    ],
    "content_scripts": [
        {
            "js": [
            ],
            "matches": [
                "https://*.music.youtube.com/*",
                "https://music.youtube.com/*"
            ]
        }
    ],
    "background": {
        "scripts": []
    }
};

/** @type {string} */
const DIST_FILE_PATH = join(__dirname, '..', 'dist');
/** @type {string} */
const DIST_FILE_SOURCE = join(DIST_FILE_PATH, 'src');

/**
 * @param {string} directory 
 * @param {string[]} collection
 */
function getAllFiles(directory) {
    const files = readdirSync(directory);

    for(let i = 0; i < files.length; i++) {
        const file = files[i];
        let path = `${directory}/${file}`;
        path = relative(DIST_FILE_PATH, path);

        if((file.endsWith('.js') || file.endsWith('.js.map')) && !file.endsWith('.bg.js') && !file.endsWith('.bg.js.map')) {
            console.log(`[BUILD]: Added content script ${file}`);
            manifest.content_scripts[0].js.push(path);
        } else if(file.endsWith('.bg.js') || file.endsWith('.bg.js.map')) {
            console.log(`[BUILD]: Found background script ${file}`);
            manifest.background.scripts.push(path);
        }
    }
}

if(manifest.background.scripts.length < 1) {
    delete manifest.background;
}

getAllFiles(DIST_FILE_SOURCE);
writeFileSync(DIST_FILE_PATH + '/manifest.json', JSON.stringify(manifest), { encoding: 'utf-8' });