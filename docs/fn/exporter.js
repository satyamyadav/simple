
import { join } from 'path';
import * as fs from 'fs-extra';
import config from 'config';

const siteName = config.name || 'site';
const publicPath = join(__dirname, '../../public');
const outPath = join(__dirname, '../../exported/' + siteName);

const copyPublic = (s, t) => {
  return fs.copy(s, t, err => {
    if (err) return console.error(err)
    console.log('success!')
  });
}


const writeHtml = (html, p) => {
  const {page} = p;
  const {name, homePath} = page;
  const dir = name == 'home' ? `${outPath}${homePath}` : `${outPath}/${name}`;


  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile(`${dir}/index.html`, html, (err) => {
    if (err) throw err;
    console.log('The file has been saved! ', `${dir}/index.html`);
  });

  copyPublic(publicPath, outPath)

}


module.exports = {writeHtml};