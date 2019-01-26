const determineContentTypeFromExtension = thumbnail => {
  if (thumbnail) {
    const fileExt = thumbnail.substring(thumbnail.lastIndexOf('.'));
    switch (fileExt) {
      case 'jpeg':
      case 'jpg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'mp4':
        return 'video/mp4';
      case 'svg':
        return 'image/svg+xml';
      case 'md':
      case 'markdown':
        return 'text/markdown';
      default:
        return '';
    }
  }
  return '';
};

export default determineContentTypeFromExtension;
