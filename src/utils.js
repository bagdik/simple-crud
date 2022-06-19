
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

export const isValidId = (id) => {
  return !!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
}