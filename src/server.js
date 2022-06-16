import http from 'http';

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.end('Jello');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
})

