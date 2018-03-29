const multipart = require('connect-multiparty');
const { publishing: { uploadDirectory } } = require('siteConfig.js');
const multipartMiddleware = multipart({uploadDir: uploadDirectory});

module.exports = multipartMiddleware;
