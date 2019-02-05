
import * as fs from 'fs';
import { parse, join, dirname } from 'path';

const yaml = require('js-yaml');
const Promise = require('bluebird');




const filterFiles = (files, ex) =>

  files.filter(f => {
    return f.lastIndexOf(ex) > -1;
  })



const parseMd = (p) => {
  let d = '';
  try {
    d = fs.readFileSync(p);
  } catch (e) {
    console.log(e);
  }
  return d;
}

const getMdFiles = (files, d) => {
  let data = files.reduce((o, f) => {
    let p = parseMd(`${d}/${f}`);
    return o = o + p;
  }, '')
  return data;
}


const parseFiles = dir => {
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    console.log("Directory not found: ", e.path);
  }
  return files;
}

const parseData = (p) => {
  let files = parseFiles(p);
  let mdFiles = filterFiles(files, '.md');
  let props = {
    mdContent: getMdFiles(mdFiles, p).toString(),
  };

  return Promise.props(props);

}


const getData = p => {
  const data = new Promise((resolve, reject) => {
    resolve(parseData(p));
  })

  return data;
}

module.exports = getData