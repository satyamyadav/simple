var express = require('express');
var router = express.Router();
import config from 'config';
import partials from '../partials';
import getMd from '../fn/getMd';

import { htmlResponse } from '../fn/views';
import getPageList from '../fn/getPageList';
const { modules = [] } = config;

const fs = require('fs');
const path = require('path');

const pageList = getPageList(modules);

var showdown = require('showdown'),
  converter = new showdown.Converter();
// text = '# hello, markdown!',
// html = converter.makeHtml(text);

// const parseFiles = dir => {
//   let files = [];
//   try {
//     files = fs.readdirSync(dir);
//   } catch (e) {
//     console.log("Directory not found: ", e.path);
//   }
//   return files;
// }


// const getFiles = (d, ex = '') => parseFiles(d).map(f => parse(`${d}/${f}`)).filter(f => f.ext === ex)


// const getContent = () => { 
//   return fs.readFileSync(path.join(__dirname, '../views/README.md'));
// }

// var markdn = require('../views/README.md')

/* GET home page. */
// router.get('/packages', function(req, res, next) {

//   res.render('index', { title: 'Express', markdn: converter.makeHtml(getContent().toString()) });
// });


const createRoute = (router, page, url) => {

  return router.get(`/${page.name}/${url.name}`, (req, res) => {


    getMd(`${url.dir}/${url.name}`).then(({ mdContent }) => {
      let args = {
        partials: partials.common,
        page: {
          ...page,
        },
        pageList,
        markDown: converter.makeHtml(mdContent)
      }
      htmlResponse(req, res, partials.common, args);

    }).catch(err => {
      console.log(err);
    })



  })


}

const createPage = (router, page) => {
  return page.routes.map((url) => {
    return createRoute(router, page, url);
  });
}

pageList.forEach((page) => {
  return createPage(router, page);
});


console.log(JSON.stringify(pageList), null, 2)

router.get(`/`, (req, res) => {

  const page = {}


  getMd(process.cwd()).then(({ mdContent }) => {
    let args = {
      partials: partials.common,
      page: {
        ...page,
      },
      pageList,
      markDown: converter.makeHtml(mdContent)
    }
    htmlResponse(req, res, partials.common, args);

  }).catch(err => {
    console.log(err);
  })



})


module.exports = router;
