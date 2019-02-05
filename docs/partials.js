import { join } from 'path';

const view = (p) => join(__dirname, './views/' + p);

var common = {
  main: view('layout/std'),
  top: view('layout/top'),
  bottom: view('layout/bottom'),
  scripts: view('layout/scripts'),
  styles: view('layout/styles'),
  sidebarLeft: view('layout/sidebarLeft'),
  panel: view('panel'),
  // sidebarRight: view('layout/sidebarRight'),
  // modals: view('layout/modals'),
  // footer: view('layout/footer'),
};

const partials = {
  common: common,
}

module.exports = partials;