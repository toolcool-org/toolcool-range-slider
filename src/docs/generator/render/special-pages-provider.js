import fs from 'fs';
import path from 'path';
import { changeExtension, removeNumberOnStart } from '../common-provider.js';
import { renderSideMenu } from './side-menu-provider.js';
import fse from 'fs-extra';

/**
 * render all pages special pages like index.html
 * @param {string} sourceRootPath
 * @param {string} targetRootPath
 * @param {object} data
 */
export const renderSpecialPages = (sourceRootPath, targetRootPath, data) => {

  const items = fs.readdirSync(sourceRootPath);

  // loop through all the nested files and folders
  for (const item of items) {

    if(item === '.DS_Store') continue;

    // get the absolute file / folder path
    const sourceItemPath = path.join(sourceRootPath, item);
    const targetItemPath = path.join(targetRootPath, removeNumberOnStart(item));

    // console.log(`Working on ${ sourceItemPath }`);

    const stat = fs.statSync( sourceItemPath );

    // in case it's a file
    if(stat.isFile()){

      const ext = path.extname(item);

      if(ext === '.html'){
        const html = fs.readFileSync(sourceItemPath, 'utf8');

        let result = data.layout.replace('{% page-content %}', html);
        result = result.replace('{% css-hash %}', data.cssTimeStamp);
        result = result.replace('{% js-hash %}', data.jsTimeStamp);

        // write the output HTML to the destination
        const targetFilePath = targetItemPath;
        fse.ensureFileSync(targetFilePath);
        fs.writeFileSync(targetFilePath, result, 'utf8');
      }
    }

    // in case it's a folder - > render recursively
    else{
      renderSpecialPages(sourceItemPath, targetRootPath, data);
    }
  }
};