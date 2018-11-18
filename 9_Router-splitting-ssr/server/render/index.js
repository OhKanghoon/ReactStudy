const fs = require('fs');
const path = require('path');
const render = require('./render').default; // ES6 형식으로 만들어진 모듈이므로, 뒤에 .default 를 붙여주어야합니다.

// html 내용을 해당 상수에 저장합니다
const template = fs.readFileSync(path.join(__dirname, '../../build/index.html'), { encoding: 'utf8'});

module.exports = async (ctx) => {
  const location = ctx.path;
  const { html, state } = await render(location);

  const page = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div><script>window.__PRELOADED_STATE__=${JSON.stringify(state)}</script>`);
  ctx.body = page; 
}