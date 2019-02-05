
import { lstatSync, readdirSync } from 'fs';
import { parse, join, dirname } from 'path';


// check if path is directory
const isDirectory = source => lstatSync(source).isDirectory()
// get directories at a path
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)


const routeList = (page) => {
  const pagePath = join(process.cwd(), page);
  const directories = getDirectories(pagePath);


  return {
    name: page, routes: directories.map(p => {
      const r = parse(p);
      return { ...r, url: `${page}/${r.name}` }
    })
  };
}

const getPages = (list) => {
  return list.map(routeList);
}

export default getPages;