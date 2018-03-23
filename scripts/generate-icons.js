/* eslint-disable */

const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir-filter');

const INPUT_DIR = path.join(__dirname, '../input/alert');
const OUTPUT_DIR = path.join(__dirname, '../output');
const INDEX_PATH = path.join(OUTPUT_DIR, './index.js');
const MAP_PATH = path.join(OUTPUT_DIR, 'iconPaths.js');
const TARGET_SIZE = '24';

const regExpStr = `ic_(.*?)_${TARGET_SIZE}px.svg`;
const regExp = new RegExp(regExpStr);

const options = {
  filterFile: stats => stats.path.match(/svg\/production/) && stats.name.match(regExp),
};

// create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdir(OUTPUT_DIR, err => {
    if (err) throw err;
    console.log(`Created directory ${OUTPUT_DIR}`);
  });
}

// create index file
if (!fs.existsSync(INDEX_PATH)) {
  fs.open(INDEX_PATH, 'w', err => {
    if (err) throw err;
    console.log(`Created index file at ${INDEX_PATH}`);
  });
}
fs.writeFile(INDEX_PATH, `export { Icon } from './icons';`, 'utf8', err => {
  if (err) throw err;
});

// create map file
if (!fs.existsSync(MAP_PATH)) {
  fs.open(MAP_PATH, 'w', err => {
    if (err) throw err;
    console.log(`Created map file at ${MAP_PATH}`);
  });
}
fs.writeFile(
  MAP_PATH,
  `import dynamic from 'next/dynamic';\n\nexport const iconPaths = {`,
  'utf8',
  err => {
    if (err) throw err;
  }
);

// read raw svgs
recursive(INPUT_DIR, options, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) throw err;
      const paths = getPaths(data);
      if (paths && file) {
        writeComponent(paths, file);
        addToIndex(file);
        addToMap(file);
      }
    });
  });
});

// TODO: figure out how to make this run after the forEach
// fs.appendFile(MAP_PATH, "\n};", "utf8", err => {
//   if (err) throw err;
// });

const getPaths = input => {
  const exp = /<path(.*?)\/>/g;
  const svgPaths = input.match(exp);
  return svgPaths;
};

const writeComponent = (svgPaths, file) => {
  if (!svgPaths) console.error('no paths found in this svg!');
  const fileName = convertName(file);
  if (!fs.existsSync(`${OUTPUT_DIR}/${fileName}.js`)) {
    fs.open(`${OUTPUT_DIR}/${fileName}.js`, 'w', err => {
      if (err) throw err;
    });
  }
  fs.writeFile(`${OUTPUT_DIR}/${fileName}.js`, componentTemplate(fileName, svgPaths), err => {
    if (err) throw err;
    console.log(`${fileName} saved...`);
  });
};

const componentTemplate = (fileName, svgPaths) =>
  `import React from 'react';
import { Icon } from '../icons';

export default ${fileName}Path = () => [${svgPaths.map(svgPath => `\n  ${svgPath}`)},\n];

export const ${fileName}Icon = Icon.extend.attrs({
  children: ${fileName}Path,
})\`\`;

export default ${fileName}Path;
export { ${fileName} };
`;

const addToIndex = file => {
  const fileName = convertName(file);

  fs.appendFile(INDEX_PATH, `\nexport { ${fileName}Icon } from './${fileName}';`, 'utf8', err => {
    if (err) throw err;
  });
};

const addToMap = file => {
  const fileName = convertName(file);
  const pathName = convertName(file, 'path');
  fs.appendFile(MAP_PATH, `\n  ${pathName}: dynamic(import('./${fileName}')),`, 'utf8', err => {
    if (err) throw err;
  });
};

const convertName = (name, type) => {
  let pathName;
  // remove previx and suffix
  let exp = /ic_(.*?)_24px.svg/;
  if (name.match(exp)) {
    pathName = name.match(exp)[1];
  } else {
    pathName = null;
  }
  // convert snake_case to camelCase
  exp = /_./gi;
  if (pathName) {
    let fileName = pathName.replace(
      exp,
      str => (isNaN(Number(str[1])) ? str[1].toUpperCase() : str[1])
    );
    // capitalize first letter
    fileName = fileName[0].toUpperCase() + fileName.slice(1);
    return type === 'path' ? pathName : fileName;
  }
};
