
import * as fs from 'fs';
import { parse, join, dirname } from 'path';

const yaml = require('js-yaml');
const Promise = require('bluebird');




const filterFiles = (files, ex) => 
  
  files.filter(f => {
    return f.lastIndexOf(ex) > -1;
  })

const getJsFiles = (files, d) => {
  let data = files.reduce((o, f) => {
    let p = parse(`${d}/${f}`);
    let m = require(`${d}/${f}`);
    if (typeof m === 'function') {
      o[p.name] = m()
    } else {
      o[p.name] = m
    }
    return o
  }, {})

  return Promise.props(data).then(d => d);
}

const parseYml = (p) => {
  let d = {};
  try {
    d = yaml.safeLoad(fs.readFileSync(`${p}`, 'utf8'));
  } catch (e) {
    console.log(e);
  }
  return d;
}

const getYmlFiles = (files, d) => {
  let data = files.reduce((o, f) => {
    let p = parse(`${d}/${f}`);
    o[p.name] = parseYml(`${d}/${f}`)
    return o
  }, {})
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
  let d = `${p.dir}/${p.base}/data`;
  let files = parseFiles(d);
  let jsFiles = filterFiles(files, '.js');
  // let jsonFiles = filterFiles(files, '.json');
  let ymlFiles = filterFiles(files, '.yml');

  let props = {
    jsFiles: getJsFiles(jsFiles, d), 
    ymlFiles: getYmlFiles(ymlFiles, d)
  };

  return Promise.props(props).then(({ymlFiles, jsFiles}) => {
    return {...ymlFiles, ...jsFiles}
  })

}


const getData = p => {
  const data = new Promise((resolve, reject) => {
    resolve(parseData(p));
  })

  return data;
}

module.exports = getData