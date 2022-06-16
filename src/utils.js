
export const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);    
    }
  })
}

export const parseId = (url) => {
  return url.split('/').pop();
}