const http = require('http');
const fs = require('fs');
const path = require('path');
const writeLocation = path.resolve(__dirname, '..', 'static');
const url = 'http://34.217.72.149/wp-json/wp/v2/posts';

function main() {
  http.get(url, handleResponse());
}
function handleResponse() {
  return resp => {
    let data = '';
    resp.on('data', chunk => {
      data += chunk;
    });
    resp.on('end', () => {
      writeBlogPosts(JSON.parse(data));
    });
  };
}

function writeBlogPosts(posts) {
  console.log('writing posts...');
  fs.writeFileSync(`${writeLocation}/posts.json`, JSON.stringify(posts));
  console.log('done writing posts!');
}

main();
