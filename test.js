const aws4 = require('aws4');

const opts = {
  host: 'localhost:8080',
  method: 'GET',
  path: '/products',
  headers: {
     accept: '*/*',
    'Host': 'localhost:8080',
    'X-Amz-Date': new Date().toISOString().replace(/[:-]/g, '').replace(/\..+/, '') + 'Z'
  }
};

const credentials = {
  accessKeyId: 'AKIDEXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY'
};

aws4.sign(opts, credentials);

console.log('Authorization:', opts.headers.Authorization);
console.log('X-Amz-Date:', opts.headers['X-Amz-Date']);
console.log('Host:', opts.headers.Host);