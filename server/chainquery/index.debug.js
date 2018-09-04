console.log('Loading `chainquery`, please wait...')

require('@babel/polyfill');
require('@babel/register');

const chainquery = require('./');

global.chainquery = chainquery.default ? chainquery.default : chainquery;

console.log('`chainquery` has been loaded into the global context.')
