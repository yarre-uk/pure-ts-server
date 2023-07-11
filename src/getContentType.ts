const getContentType = (extension: string) => {
  switch (extension) {
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.txt':
      return 'text/plain';
    default:
      return 'text/html';
  }
};

export default getContentType;
