import cluster from 'cluster';
import { cpus } from 'os';

if (cluster.isPrimary) {
  const cpusQuantity = cpus().length;
  console.log(`Quantity of CPUs is ${cpusQuantity}`);
  console.log('Primary cluster has been started');
  for(let i = 0; i < cpusQuantity; i++) {
    const worker = cluster.fork();
    worker.on('exit', () =>{
      console.log('Worker died');
    })
  }
}

if (cluster.isWorker) {
  import('./server.js');
}