const http = require('http');
const url = 'http://34.217.72.149/wp-json/wp/v2/posts';

function main() {
  http.get(url, resp => {
    let data = '';
    resp.on('data', chunk => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(data);
    });
  });
}
main();
