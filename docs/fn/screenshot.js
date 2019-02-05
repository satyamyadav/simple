
import { join } from 'path';
import * as fs from 'fs-extra';
const wkhtmltox = require('wkhtmltox');
const converter = new wkhtmltox();
const Readable = require('stream').Readable

const pdfConfig = {
  enableLocalFileAccess: true,
  transparent: false,
  fmt: 'png',
  screenWidth: 1368,
  // loadErrorHandling: 'ignore',
  // pageSize: 'A4',
  // headerHtml: urls.genUrl('export/logo'),
  // footerHtml: urls.genUrl('export/footer'),
  // footerRight: 'Page [page] of [sitePages]',
  // footerFontSize: 8,
  debug: true
}


const outPath = join(__dirname, '../../exported/screenshots');

const screenShot = (html, p) => {
  let { page } = p;
  let { name, homePath } = page;
  let dir = name == 'home' ? `${outPath}${homePath}` : `${outPath}/${name}`;
  const fullFilePath = `${ dir }/index.png`


  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
  }
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // var stream = wkhtmltox(html, pdfConfig);
  // stream.pipe(fs.createWriteStream(fullFilePath));
  // stream.on('end', function () {
  //   console.log('image written -' + fullFilePath);
  // });


  var s = new Readable
  s.push(html)    // the string you want
  s.push(null)    


  const stream = converter.image(s, { format: "png" });
  
  stream.pipe(fs.createWriteStream(fullFilePath))
  stream.on("finish", () => {
    console.log("image :", fullFilePath)
  });

  // fs.writeFile(`${dir}/index.html`, html, (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved! ', `${dir}/index.html`);
  // });

}

// const copyPublic = (s, t) => {
//   return fs.copy(s, t, err => {
//     if (err) return console.error(err)
//     console.log('success!')
//   });
// }

module.exports = { screenShot };