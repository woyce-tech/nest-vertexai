import { JWT } from 'google-auth-library';
import * as serviceAccount from './shared/serviceAccount.json';
import axios from 'axios';

export const vertexAiNew = async (prompt: string) => {
  const jwtClient = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    project_id: serviceAccount.project_id,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  await jwtClient.authorize();
  const body = {
    instances: [
      {
        prompt,
      },
    ],
    parameters: {
      temperature: 0.2,
      maxOutputTokens: 1000,
      candidateCount: 1,
    },
  };
  const { data } = await axios.post(
    `https://us-central1-aiplatform.googleapis.com/v1/projects/${serviceAccount.project_id}/locations/europe-west2/publishers/google/models/text-bison-32k:predict`,
    body,
    {
      headers: {
        Authorization: `Bearer ${jwtClient.credentials.access_token}`,
      },
    },
  );
  return data;
};
