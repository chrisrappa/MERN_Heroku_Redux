import express from 'express';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();
const router = express();

router.post('/create-support-ticket', async(req, res) => {

  const { description, user_id, subject } = req.body;

  const bodyData = {
    fields: {
      description: `${description}`,
      summary: `USER - ${user_id} - ${subject}`,
      environment: "UAT",
      issuetype: {
        id: '10004',
        name: 'Bug'
      },
      project: {
        key: 'YMA'
      },
      labels: [
        "bugfix"
      ]
    }
  };
  
  fetch('https://vortexmediaconsulting-support.atlassian.net/rest/api/2/issue', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `vortexmediaconsulting@gmail.com:${process.env.JIRA_SERVICE_API_KEY}`
      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  })
    .then(response => response.text())
    .then(text => res.status(200).send(text))
    .catch(err => res.status(500).send(err));

});

export default router;
