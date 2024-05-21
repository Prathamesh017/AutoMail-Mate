import { Queue,Worker } from 'bullmq';

const redisOptions = { host: '127.0.0.1', port: '6379',password:123456}; 
const notificationQueue = new Queue('email-queue',{redis:redisOptions});

// const notificationQueue = new Queue('email-queue', { connection: redisOptions });

function init(){
  notificationQueue.add("job 1",async ()=>{
    console.log("HELLO JOB 1 ")
  })
  notificationQueue.add("job 2",async ()=>{
    console.log("HELLO JOB 2 ")
  })
}
init();




// let arr = [];
// function incrementArr() {
//   setInterval(() => {
//     console.log(arr);
//     arr.push(arr.length + 1);
//   }, 5000);
// }
// incrementArr();

// let length = 0;

// function pollingFunc() {
//   let isNew = length !== arr.length;
//   console.log(isNew);
//   if (isNew) {
//     console.log("New entry detected in arr:", arr[arr.length - 1]);
//   }
//   length = arr.length;
// }

// // Adding the polling job to the queue with a repeatable configuration
// async function setupPollingJob() {
//   await notificationQueue.add('pollingJob', {data:"heeheh"}, {
//     repeat: { every: 6000 } // Poll every 6 seconds
//   });
// }

// // Start the polling job
// setupPollingJob().catch(console.error);

// // Worker to process the polling job
const pollingWorker = new Worker('email-queue', async job => {
  // if (job.name === 'pollingJob') {
  //   console.log(job);
  //   pollingFunc();
  // }
  console.log("HHHH");
}, {
  connection: redisOptions
});

