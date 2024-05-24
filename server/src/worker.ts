import { Queue, Worker } from 'bullmq';
import { fetchEmailService } from './service/gmail-service.ts';
import { notifyClient } from './index.ts';



const redisOptions = { host: '127.0.0.1', port: 6379 };
export const emailQueue = new Queue('emails-queue', { connection: redisOptions });


const fetchLatestEmailWorker = new Worker('emails-queue', async job => {
  try {
  let latestSender=job.data.latestSender;
  let access_token=job.data.access_token;
  console.log("JOB IN PROGRESS")
  const results = await fetchEmailService(job.data.access_token, 0);
  if(latestSender!==results[0].sender){
    await notifyClient();
  }
  await emailQueue.add('pollingJob', { access_token, latestSender: results[0].sender }, {
    delay: 5* 60 * 1000 // 5 minutes delay
  });
} catch (error) {
    console.log(error);
}
}, {
  connection: redisOptions
});
