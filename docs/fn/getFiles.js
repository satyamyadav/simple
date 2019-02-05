const fs = require('fs');
const parse = require('path').parse;

const parseFiles = dir => {
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    console.log("Directory not found: ", e.path);
  }
  return files;
}


const getFiles = (d, ex='') => parseFiles(d).map(f => parse(`${d}/${f}`)).filter(f => f.ext === ex)
  
module.exports = getFiles;
