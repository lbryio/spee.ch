const multipart = require('connect-multiparty');
const { publishing: { uploadDirectory } } = require('@config/siteConfig');
const multipartMiddleware = multipart({uploadDir: uploadDirectory});

module.exports = multipartMiddleware;
