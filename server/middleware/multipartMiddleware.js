import multipart from 'connect-multiparty';
import { publishing } from '@config/siteConfig';
const { uploadDirectory } = publishing;
const multipartMiddleware = multipart({ uploadDir: uploadDirectory });

export default multipartMiddleware;
