import { Queue, Worker } from 'bullmq';
import { fetchEmailService } from './service/gmail-service.ts';
import { notifyClient } from './index.ts';
import { emailType } from './controllers/email-controller.ts';
import { fetchOutLookEmailService } from './service/outlook-service.ts';





const redisOptions = { host: '127.0.0.1', port: 6379 };
export const emailQueue = new Queue('emails-queue', { connection: redisOptions });


const fetchLatestEmailWorker = new Worker('emails-queue', async job => {
  try {
    if (job.name === 'emails-fetch-job') {
      let latestSender = job.data.latestSender;
      let access_token = job.data.access_token;
      console.log("JOB IN PROGRESS", job.data.job);
      let results;
      if (job.data.mailType === emailType.GMAIL) {
        results = await fetchEmailService(job.data.access_token, 0);
      } else {
        results = await fetchOutLookEmailService(job.data.access_token, 0);
      }
      if (latestSender!==results[0].sender){
        await notifyClient();
      }
      await emailQueue.add('emails-fetch-job', { access_token, latestSender: results[0].sender, job: job.data.job + 1, mailType: job.data.mailType }, {
        delay: 5* 60 * 1000 // 5 minutes delay
      });
    }
  } catch (error) {
    console.log(error);
  }
}, {
  connection: redisOptions
});
