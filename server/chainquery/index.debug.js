console.log('Loading `chainquery`, please wait...')

import chainquery from './index'

global.chainquery = chainquery.default ? chainquery.default : chainquery;

console.log('`chainquery` has been loaded into the global context.')
